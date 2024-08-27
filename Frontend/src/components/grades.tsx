import React, { useState } from 'react';
import axios from 'axios';
import styles from './GradeCalculator.module.css';
import { Link } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

interface Grades {
    student_id: number;
    student_name: string;
    midterm1: number;
    midterm2: number;
    assignment1: number;
    assignment2: number;
    assignment3: number;
    assignment4: number;
    assignment5: number;
    assignment6: number;
    assignment7: number;
    assignment8: number;
    assignment9: number;
    assignment10: number;
    final_exam: number;
}

interface ClassAverages {
    avg_midterm1: number;
    avg_midterm2: number;
    avg_assignment1: number;
    avg_assignment2: number;
    avg_assignment3: number;
    avg_assignment4: number;
    avg_assignment5: number;
    avg_assignment6: number;
    avg_assignment7: number;
    avg_assignment8: number;
    avg_assignment9: number;
    avg_assignment10: number;
    avg_final_exam: number;
  }

  const StudentGrades: React.FC = () => {
    const [studentId, setStudentId] = useState<number | null>(null);
    const [grades, setGrades] = useState<Grades | null>(null);
    const [classAverages, setClassAverages] = useState<ClassAverages | null>(null);
    const [error, setError] = useState<string | null>(null);
  
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setStudentId(Number(event.target.value));
    };
  
    const fetchGrades = async () => {
      if (studentId === null) {
        setError('Please enter a valid student ID');
        return;
      }
  
      try {
        const response = await axios.get<{ studentGrades: Grades; classAverages: ClassAverages }>(`http://localhost:3001/student_grades/${studentId}`);
        setGrades(response.data.studentGrades);
        setClassAverages(response.data.classAverages);
        setError(null);
      } catch (error) {
        setError('Could not fetch grades. Please check the student ID and try again.');
        setGrades(null);
        setClassAverages(null);
      }
    };
  
    const getGradeData = () => {
      if (!grades || !classAverages) return {
        labels: [],
        datasets: []
      };
  
      return {
        labels: [
          'Midterm 1', 'Midterm 2',
          'Assignment 1', 'Assignment 2', 'Assignment 3', 'Assignment 4', 'Assignment 5',
          'Assignment 6', 'Assignment 7', 'Assignment 8', 'Assignment 9', 'Assignment 10',
          'Final Exam'
        ],
        datasets: [
          {
            label: 'Student Grades',
            data: [
              grades.midterm1, grades.midterm2,
              grades.assignment1, grades.assignment2, grades.assignment3, grades.assignment4,
              grades.assignment5, grades.assignment6, grades.assignment7, grades.assignment8,
              grades.assignment9, grades.assignment10, grades.final_exam
            ],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
          {
            label: 'Class Averages',
            data: [
              classAverages.avg_midterm1, classAverages.avg_midterm2,
              classAverages.avg_assignment1, classAverages.avg_assignment2, classAverages.avg_assignment3, classAverages.avg_assignment4,
              classAverages.avg_assignment5, classAverages.avg_assignment6, classAverages.avg_assignment7, classAverages.avg_assignment8,
              classAverages.avg_assignment9, classAverages.avg_assignment10, classAverages.avg_final_exam
            ],
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1,
          },
        ],
      };
    };

    const calculateFinalPercentage = (grades: any) => {
        const weights = {
            midterm1: 0.1,
            midterm2: 0.1,
            assignments: 0.4,
            final_exam: 0.4
        };
    
        const assignmentsTotal = (grades.assignment1 + grades.assignment2 + grades.assignment3 + grades.assignment4 +
            grades.assignment5 + grades.assignment6 + grades.assignment7 + grades.assignment8 +
            grades.assignment9 + grades.assignment10) / 10;
    
        const finalPercentage = (grades.midterm1 * weights.midterm1) +
            (grades.midterm2 * weights.midterm2) +
            (assignmentsTotal * weights.assignments) +
            (grades.final_exam * weights.final_exam);
    
        return finalPercentage;
    };

    const percentageToLetter = (percentage: number) => {
        if (percentage >= 97) {
            return 'A+';
        } else if (percentage >= 93) {
            return 'A';
        } else if (percentage >= 90) {
            return 'A-';
        } else if (percentage >= 87) {
            return 'B+';
        } else if (percentage >= 83) {
            return 'B';
        } else if (percentage >= 80) {
            return 'B-';
        } else if (percentage >= 77) {
            return 'C+';
        } else if (percentage >= 73) {
            return 'C';
        } else if (percentage >= 70) {
            return 'C-';
        } else if (percentage >= 67) {
            return 'D+';
        } else if (percentage >= 63) {
            return 'D';
        } else if (percentage >= 60) {
            return 'D-';
        } else {
            return 'F';
        }
    };

    return (
      <>
        <div className={styles.container}>
          <h1>Get Student Grades</h1>
          <input
            type="number"
            value={studentId !== null ? studentId : ''}
            onChange={handleInputChange}
            placeholder="Enter Student ID"
          />
          <button className={styles.button} onClick={fetchGrades}>Fetch Grades</button>
  
          {error && <p>{error}</p>}
  
          {grades && classAverages && (
            <div>
              <h2>Grades for Student ID: {grades.student_id}</h2>
              <ul>
                <li>Student Name: {grades.student_name}</li>
                <li>Midterm 1: {grades.midterm1}</li>
                <li>Midterm 2: {grades.midterm2}</li>
                <li>Assignment 1: {grades.assignment1}</li>
                <li>Assignment 2: {grades.assignment2}</li>
                <li>Assignment 3: {grades.assignment3}</li>
                <li>Assignment 4: {grades.assignment4}</li>
                <li>Assignment 5: {grades.assignment5}</li>
                <li>Assignment 6: {grades.assignment6}</li>
                <li>Assignment 7: {grades.assignment7}</li>
                <li>Assignment 8: {grades.assignment8}</li>
                <li>Assignment 9: {grades.assignment9}</li>
                <li>Assignment 10: {grades.assignment10}</li>
                <li>Final Exam: {grades.final_exam}</li>
                <li>Final Percentage: {calculateFinalPercentage(grades).toFixed(2)} ({percentageToLetter(calculateFinalPercentage(grades))})</li>
              </ul>
              <div className={styles.chart}>
                <Bar data={getGradeData()} options={{ responsive: true }} />
              </div>
            </div>
          )}
        </div>
        <div className={styles.container}>
          <Link to="/grade-calculator">
            <button className={styles.button}>Go to GPA Calculator</button>
          </Link>
        </div>
      </>
    );
  };

export default StudentGrades;
