function generarSKU(productMeasureName, productTypeName, productName) {
  // Eliminar espacios y convertir a mayúsculas
  productMeasureName = productMeasureName.replace(/\s/g, "").toUpperCase();
  productTypeName = productTypeName.replace(/\s/g, "").toUpperCase();
  productName = productName.replace(/\s/g, "").toUpperCase();

  // Tomar las primeras tres letras del tipo de producto y del nombre del producto
  const measureAbbr = productMeasureName.slice(0, 2);
  const typeAbbr = productTypeName.slice(0, 2);
  const nameAbbr = productName.slice(0, 2);

  // Generar una cadena aleatoria de 4 caracteres alfanuméricos
  const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXY";
  let aleatorio = "";
  for (let i = 0; i < 2; i++) {
    const randomIndex = Math.floor(Math.random() * caracteres.length);
    aleatorio += caracteres.charAt(randomIndex);
  }

  const date = new Date();
  const timeMs = `${date.getTime()}`;
  const timeMsLastFourNum = timeMs.substring(timeMs.length - 4);

  // Combinar las abreviaturas y el valor aleatorio para formar el SKU
  const sku = measureAbbr + typeAbbr + nameAbbr + timeMsLastFourNum + aleatorio;

  return sku;
}

const skuGenerado = generarSKU('contables', 'consumibles', 'unicos');
console.log("SKU generado:", skuGenerado);
