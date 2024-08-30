import { pool } from '../config/db.config.js';

class Project {
    constructor(project) {
        this.name = project.name;
        this.location_id = project.location_id;
        this.type_id = project.type_id;
    }

    static insertProject(newProject, result) {
        // Store projects details in MySQL database
        pool.query('INSERT INTO projects SET ?', newProject, (err, res) => {
            if (err) {
                console.error('Error inserting project into database:', err);
                result(err, null);
                return;
            }
            result(null, { id: res.insertId, ...newProject });

        });
    }
    // Get all projects
    static getProjects() {
        return new Promise((resolve, reject) => {
            const sql = `SELECT 
        p.id,
        p.name,
        l.name AS location_name,
        t.type AS type_name,
        COUNT(DISTINCT f.id) AS folder_count,
        COUNT(fl.id) AS file_count
    FROM 
        projects p
    LEFT JOIN 
        locations l ON p.location_id = l.id
    LEFT JOIN 
        project_type t ON p.type_id = t.id
    LEFT JOIN 
        folders f ON f.project_id = p.id
    LEFT JOIN 
        files fl ON f.id = fl.folder_id
    WHERE 
        p.blockstatus = '0' 
        AND p.deletestatus = '0'
    GROUP BY 
        p.id, p.name, l.name, t.type;`;
            pool.query(sql, [], (err, results) => {
                if (err) {
                    console.error('Error executing query:', err);
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }

    // Get locations
    static getLocations(){  
        return new Promise((resolve, reject) => {
            const sql = `SELECT l.name, l.id FROM locations l WHERE l.blockstatus = '0' AND l.deletestatus = '0'`;
            pool.query(sql, [], (err, results) => {
            if (err) {
                console.error('Error executing query:', err);
                reject(err);
            } else {
                resolve(results);
            }
            });
        });
    }

        // Get project type
        static getProjectType(){  
            return new Promise((resolve, reject) => {
                const sql = `SELECT t.type, t.id FROM project_type t WHERE t.blockstatus = '0' AND t.deletestatus = '0'`;
                pool.query(sql, [], (err, results) => {
                if (err) {
                    console.error('Error executing query:', err);
                    reject(err);
                } else {
                    resolve(results);
                }
                });
            });
        }

}

export default Project;