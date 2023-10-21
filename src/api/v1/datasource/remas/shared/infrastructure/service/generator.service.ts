require('dotenv').config();
import { readFileSync, readdirSync, rmSync, writeFileSync, existsSync, mkdirSync, rmdirSync } from 'fs';
import { IConfig, ModelBuilder, DialectPostgres } from 'sequelize-typescript-generator';
const env = {};

(async () => {
    const props: {
        schema?: string;
    } = {};

    const args = process.argv;
    args.forEach(function (item, index, array) {
        const parts = item.split('=');
        if (`${parts![0]}`.toLowerCase() == 'schema'.toLowerCase()) props['schema'] = `${parts![1] ?? ''}`.toLowerCase();
    });

    console.log("🚀 ~ file: generator.service.ts:18 ~ props.schema:", props.schema)
    if (props.schema) {
        const data = readFileSync('./.env', { encoding: `utf-8` });
        const exp = new RegExp(/(.+)(=)(.+)/g);
        const matchs = data.matchAll(exp);
        for (const match of matchs) {
            env[match[1]] = match[3]?.toLowerCase();
        }

        const modelPath = __dirname + `/../../domain/model/${props.schema}`;
        const dtoPath = __dirname + `/../../domain/dto/${props.schema}`;
        if (existsSync(dtoPath)) rmdirSync(dtoPath, { recursive: true })
        mkdirSync(dtoPath, { recursive: true });

        const interPath = __dirname + `/../../domain/interface/${props.schema}`;
        if (existsSync(interPath)) rmdirSync(interPath, { recursive: true })
        mkdirSync(interPath, { recursive: true });

        const providerPath = __dirname + `/../../../connection/application/provider/${props.schema}`;
        if (existsSync(providerPath)) rmdirSync(providerPath, { recursive: true })
        mkdirSync(providerPath, { recursive: true });

        const relationshipPath = __dirname + `/../../domain/constant/${props.schema}.relationship.constant.csv`;
        const relationshipExists = existsSync(relationshipPath);
        if (!relationshipExists) {

            writeFileSync(relationshipPath, '', { encoding: 'utf-8' });
        }

        const config: IConfig = {
            connection: {
                dialect: env['REMAS_DIALECT'],
                port: env['REMAS_PORT'],
                host: env['REMAS_HOST'],
                username: env['REMAS_USER'],
                password: env['REMAS_PASS'],
                database: env['REMAS_DB'],
                schema: props.schema,
            },
            metadata: {
                schema: props.schema,
                case: {
                    model: 'PASCAL',
                    column: 'CAMEL',
                },
                indices: true,
                associationsFile: relationshipPath,
            },
            output: {
                clean: true,
                outDir: modelPath
            },
            strict: false,
        };

        const dialect = env['REMAS_DIALECT'] == 'postgres' ? new DialectPostgres() : new DialectPostgres();

        const builder = new ModelBuilder(config, dialect);

        try {
            await builder.build();
        }
        catch (err) {
            process.exit(1);
        }

        const dirs = readdirSync(modelPath, { encoding: `utf-8` });
        let providers = [];
        for (let index = 0; index < dirs.length; index++) {
            const dir = dirs[index];
            let fileData = readFileSync(modelPath + '/' + dir, { encoding: `utf-8` });
            rmSync(modelPath + '/' + dir);

            let comment = `/**\n`;
            comment += `* Documento generado automaticamente por Edmundo Guerrero, no modificar\n`;
            comment += `*/\n`;
            fileData = comment + fileData;
            fileData = fileData.replace(/\@Table\(\{/g, `@Table({ schema: '${props.schema}', `);

            const dtoImports = [];
            fileData = fileData.replace(new RegExp(`(from)(.+)(')(.\\/)(.+)(')(;)`, `g`),
                (m, p1, p2, p3, p4, p5, p6, p7) => {
                    let fileNameNew = p5.split(/(?=[A-Z])/).join('-').toLowerCase();
                    fileNameNew = `${fileNameNew}`.replace(/(.*)(-em-)(.*)/,
                        (sM, sP1, sP2, sP3) => {
                            if (sP2) {
                                return '../' + sP1 + '/' + sP3;
                            }
                            return sM;
                        });
                    dtoImports.push(fileNameNew);
                    const result = p1 + p2 + p3 + './' + fileNameNew + p6 + p7;
                    return result;
                }).replace(/([ ]+)([A-Z])([a-z0-9_A-Z]+)(()|(\?)|(!))(:)/g,
                    (m, p1, p2, p3, p4, p5, p6, p7, p8) => p1 + p2.toLowerCase() + p3 + p4 + p8);

            const propsChanged = [];
            fileData = fileData.replace(/(.*)({ )([A-Za-z0-9]+)(Em)([A-Z])(.*)/g,
                (sM, sP1, sP2, sP3, sP4, sP5, sP6) => {
                    if (sP4) {
                        propsChanged.push({ old: sP3 + sP4 + sP5, new: sP5 });
                        return sP1 + sP2 + sP5 + sP6;
                    }
                    return sM;
                });

            propsChanged.forEach((propChanged) => {
                fileData = fileData.replace(new RegExp(`${propChanged.old}`, 'g'), propChanged.new);
                fileData = fileData.replace(new RegExp(`${propChanged.old[0].toLowerCase() + propChanged.old.substring(1, propChanged.old.length)}`, 'g'), propChanged.new[0].toLowerCase() + propChanged.new.substring(1, propChanged.new.length));
            });

            const lastIndex = dir.lastIndexOf('.');
            const fileName = dir.slice(0, lastIndex);
            const fileNameNew = fileName.split(/\.?(?=[A-Z])/).join('-').toLowerCase();
            let fileNamePascal = fileNameNew.replace(/(-)([a-z])/g, (m, p1, p2) => p2.toUpperCase());
            fileNamePascal = fileNamePascal[0].toUpperCase() + fileNamePascal.substring(1, fileNamePascal.length);

            let dto = ``;
            let inter = ``;

            const matchs = fileData.matchAll(/(.*)(\?\:)(.*)/g);
            for (const match of matchs) {
                const propGroup = match[0].replace(';', '').trim();
                const propPart = propGroup.split('?:');
                const propType = propPart[1].trim().replace('[]', '');
                const propIsArray = propType != propPart[1].trim();
                const propName = propPart[0].trim();

                dto += `\t@IsOptional()\n`;
                if (['string', 'number', 'boolean', 'Date', 'object'].includes(propType)) {
                    if (!propIsArray) dto += `\t@Is${propType[0].toUpperCase() + propType.substring(1, propType.length)}()\n`;
                    if (propIsArray) {
                        dto += `\t@IsArray()\n`;
                        dto += `\t@ValidateNested({each: true})\n`;
                        dto += `\t@Type(()=>${propType})\n`;
                    }
                    dto += `\t${propGroup.replace('?:', ':')};\n\n`;
                    inter += `\t${propGroup.replace('?:', ':')};\n\n`;
                } else {
                    if (!propIsArray) dto += `\t@IsObject()\n`
                    if (propIsArray) {
                        dto += `\t@IsArray()\n`;
                        dto += `\t@ValidateNested({each: true})\n`;
                        dto += `\t@Type(()=>${propType}Dto)\n`;
                        dto += `\t${propGroup.replace('?:', ':').replace('[]', 'Dto[]')};\n\n`;
                        inter += `\t${propGroup.replace('?:', ':').replace('[]', 'Interface[]')};\n\n`;
                    } else {
                        dto += `\t${propGroup.replace('?:', ':')}Dto;\n\n`;
                        inter += `\t${propGroup.replace('?:', ':')}Interface;\n\n`;
                    }
                };



            }

            let dtoHeads = ``;
            let interHeads = ``;
            dtoImports.forEach((dtoImport) => {
                let dtoImportPascal = dtoImport.replace(/(-)([a-z])/g, (m, p1, p2) => p2.toUpperCase());
                dtoImportPascal = dtoImportPascal[0].toUpperCase() + dtoImportPascal.substring(1, dtoImportPascal.length);
                const split = dtoImportPascal.split('/');
                const requiredImport = dto.indexOf(split[split.length - 1]);
                const real = split[split.length - 1];
                console.log("🚀 ~ file: generator.service.ts:175 ~ dtoImports.forEach ~ real:", real, '=', real[0].toUpperCase() + real.substring(1, real.length))
                providers.push(dtoImportPascal);
                if (requiredImport) {
                    dtoHeads += `import { ${real[0].toUpperCase() + real.substring(1, real.length)}Dto } from './${dtoImport}.dto';\n\n`;
                    interHeads += `import { ${real[0].toUpperCase() + real.substring(1, real.length)}Interface } from './${dtoImport}.interface';\n\n`;
                }
            });
            let dtoFinal = ``;
            let interFinal = ``;
            dtoFinal += `import { IsBoolean, IsDate, IsObject, IsOptional, IsString, IsArray, ValidateNested } from 'class-validator'; \n`;
            dtoFinal += `import { Type } from 'class-transformer';\n`;
            dtoFinal += dtoHeads;
            interFinal += interHeads;
            dtoFinal += `export class ${fileNamePascal}Dto{\n`;
            interFinal += `export interface ${fileNamePascal}Interface{\n`;
            dtoFinal += dto;
            interFinal += inter;
            dtoFinal += `}`;
            interFinal += `}`;

            writeFileSync(interPath + '/' + fileNameNew + '.interface.ts', interFinal, { encoding: 'utf-8' });
            writeFileSync(dtoPath + '/' + fileNameNew + '.dto.ts', dtoFinal, { encoding: 'utf-8' });
            writeFileSync(modelPath + '/' + fileNameNew + '.ts', fileData, { encoding: 'utf-8' });
        }

        let provider = ``;
        provider += `import { ${providers.join(',\n')} } from './../../../../shared/domain/model/${props.schema}';\n`
        provider += `export const connectionProvider = [\n`; // providerPath
        provider += providers.map((itemProvider) => {
            return `{ provide: '${itemProvider}Repository', useValue: ${itemProvider} }`;
        }).join(',\n');
        provider += `];`

        provider += `export const models = [\n`; // providerPath
        provider += providers.join(',\n');
        provider += `];`

        writeFileSync(providerPath + '/connection.provider.ts', provider, { encoding: 'utf-8' });
    }
})();