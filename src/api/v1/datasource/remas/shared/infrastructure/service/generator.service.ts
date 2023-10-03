require('dotenv').config();
import { readFileSync, readdirSync, rmSync, writeFileSync, existsSync } from 'fs';
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

        const modelPath = __dirname+`/../../domain/model/${props.schema}`;
        const relationshipPath = __dirname+`/../../domain/constant/${props.schema}.relationship.constant.csv`;
        const relationshipExists = existsSync(relationshipPath);
        console.log("🚀 ~ file: generator.service.ts:29 ~ relationshipExists:", relationshipExists)
        if (!relationshipExists){

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
            }
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
        for (let index = 0; index < dirs.length; index++) {
            const dir = dirs[index];
            const fileData = readFileSync(modelPath + '/' + dir, { encoding: `utf-8` });
            rmSync(modelPath + '/' + dir);

            const fileDataNew = fileData.replace(new RegExp(`(from)(.+)(')(.\\/)(.+)(')(;)`, `g`),
                (m, p1, p2, p3, p4, p5, p6, p7) => {
                    const fileNameNew = p5.split(/(?=[A-Z])/).join('_').toLowerCase();
                    const result = p1 + p2 + p3 + p4 + fileNameNew + p6 + p7;
                    return result;
                }).replace(/([ ]+)([A-Z])([a-z0-9_A-Z]+)(()|(\?)|(!))(:)/g,
                    (m, p1, p2, p3, p4, p5, p6, p7, p8) => p1 + p2.toLowerCase() + p3 + p4 + p8);;

            const lastIndex = dir.lastIndexOf('.');
            const fileName = dir.slice(0, lastIndex);
            const fileNameNew = fileName.split(/\.?(?=[A-Z])/).join('_').toLowerCase();
            writeFileSync(modelPath + '/' + fileNameNew + '.ts', fileDataNew, { encoding: 'utf-8' });
        }
    }
})();