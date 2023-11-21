const excel = require('exceljs');
const CatchAsync = require("../utils/CatchAsync");

exports.ProductRow = CatchAsync(async (req, res, next) => {
    const fileId = req.body.id;
    //console.log('Requested ID:', fileId);
    const WORKSHEET_INDEX = 1; 
    const IDCOLUMN_INDEX = 1; 


    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    const workbook = new excel.Workbook();
    await workbook.xlsx.load(req.file.buffer);

    const worksheet = workbook.getWorksheet(WORKSHEET_INDEX);
    const rows = worksheet.getSheetValues();

    //console.log('All rows:', rows);

    const matchedRows = rows.filter(row => String(row[IDCOLUMN_INDEX]) === String(fileId))
                            .map(row => row.slice(1)); //exclude column with index zero (not exist)

    //console.log('Matched rows:', matchedRows);

    if (matchedRows.length > 0) {
        res.json({ rows: matchedRows });
    } else {
        res.status(404).send('No data found for the given ID.');
    }
});
