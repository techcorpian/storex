import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import * as dotenv from 'dotenv';
import fs from 'fs';
dotenv.config();

// Define __dirname for ES6 module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Importing routes
import FileRoutes from './routes/FileRoutes.js';
import ProjectRoutes from './routes/ProjectRoutes.js';
import FolderRoutes from './routes/FolderRoutes.js';
import AuthRoutes from './routes/auth/AuthRoutes.js';

// Middleware
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

// Routes
app.use('/store', FileRoutes);
app.use('/projects', ProjectRoutes);
app.use('/folders', FolderRoutes);
app.use('/api/auth', AuthRoutes);

// Route to get both total folder size and size of files with specific extensions
app.get('/foldersize', async (req, res) => {
    const folderPath = path.join(__dirname, 'uploads'); // Path to the folder
    const fileExtensions = req.query.extension ? req.query.extension.split(',') : []; // Get file extensions from query params

    console.log('Folder Path:', folderPath); // Debugging line
    console.log('File Extensions:', fileExtensions); // Debugging line

    try {
        // Function to get both total size and specific extensions size
        async function getSizes(dir, extensions) {
            let totalSize = 0;
            let extensionSize = 0;

            const files = await fs.promises.readdir(dir);

            for (const file of files) {
                const filePath = path.join(dir, file);
                const stats = await fs.promises.stat(filePath);

                if (stats.isFile()) {
                    totalSize += stats.size;
                    if (extensions.some(ext => file.endsWith(ext.trim()))) {
                        extensionSize += stats.size;
                    }
                } else if (stats.isDirectory()) {
                    const subdirSizes = await getSizes(filePath, extensions);
                    totalSize += subdirSizes.totalSize;
                    extensionSize += subdirSizes.extensionSize;
                }
            }

            return { totalSize, extensionSize };
        }

        // Calculate sizes
        const { totalSize, extensionSize } = await getSizes(folderPath, fileExtensions);
        const totalSizeInMB = (totalSize / 1024 / 1024).toFixed(2);
        const extensionSizeInMB = (extensionSize / 1024 / 1024).toFixed(2);

        console.log(`Total folder size: ${totalSize} bytes`);
        console.log(`Total size of specified files: ${extensionSize} bytes`);

        res.json({
            totalSize: `${totalSizeInMB}`,
            extensionSize: `${extensionSizeInMB}`
        });
    } catch (error) {
        console.error('Error calculating folder size:', error);
        res.status(500).json({ error: 'Unable to calculate folder size' });
    }
});

app.listen(process.env.PORT, () => {
    console.log('Zibranium (backend) is running on port', process.env.PORT);
});
