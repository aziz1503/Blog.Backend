const path = require('path');
const fs = require('fs/promises');

const PathToFile = path.join(__dirname, 'data.json');

async function ReadData() {
    try {
        const data = await fs.readFile(PathToFile, 'utf8');

        if (!data.trim()) {
            return [];
        }

        return JSON.parse(data);
    } catch (error) {
        if (error.code === 'ENOENT') {
            await fs.writeFile(PathToFile, '[]');
            return [];
        }

        throw error;
    }
}

async function WriteData(data) {
    await fs.writeFile(
        PathToFile,
        JSON.stringify(data, null, 2)
    );

    console.log('Data is changed');
}

async function AppendData(data) {
    const blogs = await ReadData();

    blogs.push(data);

    await WriteData(blogs);

    console.log('Data added');
}

module.exports = {
    ReadData,
    WriteData,
    AppendData
};