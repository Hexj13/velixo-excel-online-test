// function main(workbook: ExcelScript.Workbook) {
//   let sheet = workbook.getActiveWorksheet();

//   let range = sheet.getRange('A2');
//   range.setFormula('=TODAY()');

//   let value = range.getValue();

//   let labelRange = sheet.getRange('A1');
//   labelRange.setValue('Current Date:');

//   range.getFormat().setNumberFormat('mm/dd/yyyy');

//   sheet.getRange('A:A').getFormat().autofitColumns();

//   return {
//     todayValue: value,
//     todayFormula: range.getFormula(),
//   };
// }
