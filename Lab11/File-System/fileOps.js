const fs = require('fs');

const fileName = 'example.txt';

// STEP 1: CREATE + WRITE
fs.writeFile(fileName, 'Hello, this is initial content.\n', (err) => {
    if (err) {
        console.error('Write Error:', err);
        return;
    }
    console.log('File created and written.');

    // STEP 2: APPEND
    fs.appendFile(fileName, 'Appending new data.\n', (err) => {
        if (err) {
            console.error('Append Error:', err);
            return;
        }
        console.log('Data appended.');

        // STEP 3: READ
        fs.readFile(fileName, 'utf8', (err, data) => {
            if (err) {
                console.error('Read Error:', err);
                return;
            }
            console.log('File Content:\n' + data);

            // STEP 4: DELETE
            fs.unlink(fileName, (err) => {
                if (err) {
                    console.error('Delete Error:', err);
                    return;
                }
                console.log('File deleted.');
            });
        });
    });
});