import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import { error } from 'console';

const app = express();

// Use cors middleware
app.use(cors());
app.use(express.json());

// Create connection to MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'byte888',
    password: 'Byte1231!',
    database: 'CanvasLMS',
    port: 3306
});

// Connect to MySQL
db.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }
    console.log('MySQL connected...');
});

// Define route to get student grades
// app.get('/student_grades/:id', (req, res) => {
//     const studentId = Number(req.params.id);
//     let sql = `SELECT * FROM student_grades WHERE student_id = ?`;
//     db.query(sql, [studentId], (err, result) => {
//         if (err) {
//             console.log('Error executing query:', err.stack)
//             res.status(500).send('Error fetching grades');
//             return;
//         } else {
//             res.json(result[0]);
//         }
//     });
// });
app.get('/student_grades/:id', (req, res) => {
    const studentId = Number(req.params.id);

    // Query to get the student's grades
    const studentGradesQuery = `SELECT * FROM student_grades WHERE student_id = ?`;

    // Query to get the class averages for each grade mark
    const classAveragesQuery = `
        SELECT 
            AVG(midterm1) as avg_midterm1,
            AVG(midterm2) as avg_midterm2,
            AVG(assignment1) as avg_assignment1,
            AVG(assignment2) as avg_assignment2,
            AVG(assignment3) as avg_assignment3,
            AVG(assignment4) as avg_assignment4,
            AVG(assignment5) as avg_assignment5,
            AVG(assignment6) as avg_assignment6,
            AVG(assignment7) as avg_assignment7,
            AVG(assignment8) as avg_assignment8,
            AVG(assignment9) as avg_assignment9,
            AVG(assignment10) as avg_assignment10,
            AVG(final_exam) as avg_final_exam
        FROM student_grades
    `;

    // Execute both queries
    db.query(studentGradesQuery, [studentId], (err, studentResult) => {
        if (err) {
            console.error('Error executing student grades query:', err.stack);
            res.status(500).send('Error fetching student grades');
            return;
        }

        if (studentResult.length === 0) {
            res.status(404).send('Student not found');
            return;
        }

        db.query(classAveragesQuery, (err, averagesResult) => {
            if (err) {
                console.error('Error executing class averages query:', err.stack);
                res.status(500).send('Error fetching class averages');
                return;
            }

            const response = {
                studentGrades: studentResult[0],
                classAverages: averagesResult[0]
            };

            res.json(response);
        });
    });
});

// Start server on port 3001
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Express server started on port ${PORT}`);
});

