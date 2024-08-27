import { useState } from 'react';
import styles from './GradeCalculator.module.css';
import logo from './images/uiuclogo.png';

interface Grade {
  grade: string;
  creditHours: string;
}

const GradeCalculator = () => {
  const [grades, setGrades] = useState<Grade[]>([]);
  const [grade, setGrade] = useState('');
  const [previousGPA, setPreviousGPA] = useState('')
  const [previousCreditHours, setPreviousCreditHours] = useState('');
  const [creditHours, setCreditHours] = useState('');
  const [semesterGPA, setsemesterGPA] = useState<number | null>(null);
  const [cumulativeGPA, setcumulativeGPA] = useState<number | null>(null);

  const handleAddGrade = () => {
    if (grade && creditHours) {
      if (isValidGrade(grade.toUpperCase()) && isValidHour(creditHours)) {
        setGrades([...grades, { grade, creditHours }]);
        setGrade('');
        setCreditHours('');
      } else if (!isValidGrade(grade.toUpperCase())) {
        alert('Invalid grade entered!');
      } else if (!isValidHour(creditHours)) {
        alert('Invalid credit hours entered!');
      }
    }
  };

  const calculateSemesterGPA = () => {
    let totalPoints = 0;
    let totalCredits = 0;

    grades.forEach((g) => {
      const creditValue = parseFloat(g.creditHours);
      totalCredits += creditValue;
      totalPoints += creditValue * letterToGPA(g.grade);
    });

    const gpa = totalCredits !== 0 ? totalPoints / totalCredits : 0;
    setsemesterGPA(parseFloat(gpa.toFixed(2)));
  };

  const calculatecumulativeGPA = () => {
    let totalPoints = 0;
    let totalCredits = 0;

    grades.forEach((g) => {
      const creditValue = parseFloat(g.creditHours);
      totalCredits += creditValue;
      totalPoints += creditValue * letterToGPA(g.grade);
    });

    if (!isValidPreviousGPA(previousGPA)) {
      alert('Invalid previous GPA entered!');
    } else if (!isValidPreviousHour(previousCreditHours)) {
      alert('Invalid previous credit hours entered!')
    } else {
      totalCredits += parseFloat(previousCreditHours);
      totalPoints += parseFloat(previousCreditHours) * parseFloat(previousGPA);
  
      const gpa = totalCredits !== 0 ? totalPoints / totalCredits : 0;
      setcumulativeGPA(parseFloat(gpa.toFixed(2)));
    }
  };

  const isValidGrade = (grade: string) => {
    const validGrades = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'D-', 'F'];
    return validGrades.includes(grade);
  };


  const isValidHour = (creditHours: string) => {
    const validHours = ['1', '2', '3', '4', '5', '6', '7', '8'];
    return validHours.includes(creditHours);
  };

  const isValidPreviousHour = (creditHours: string) => {
    const parsedHours = parseInt(creditHours, 10);
    return !isNaN(parsedHours) && parsedHours >= 0 && parsedHours <= 200;
  };

  const isValidPreviousGPA = (GPA: string) => {
    const parsedGPA = parseFloat(GPA);
    return !isNaN(parsedGPA) && parsedGPA >= 0 && parsedGPA <= 4.0;
  };

  const handleDeleteGrade = (index: number) => {
    const updatedGrades = [...grades];
    updatedGrades.splice(index, 1);
    setGrades(updatedGrades);
  }

  const letterToGPA = (letter: string) => {
    switch (letter.toUpperCase()) {
      case 'A+':
        return 4.0;
      case 'A':
        return 4.0;
      case 'A-':
        return 3.67;
      case 'B+':
        return 3.33;
      case 'B':
        return 3.0;
      case 'B-':
        return 2.67;
      case 'C+':
        return 2.33;
      case 'C':
        return 2.0;
      case 'C-':
        return 1.67;
      case 'D+':
        return 1.33;
      case 'D':
        return 1.0;
      case 'D-':
        return 0.67
      case 'F':
        return 0.0;
      default:
        return 0.0;
    }
  };

  const handleStartOver = () => {
    window.location.reload();
  };

  return (
    <div className={styles.container}>
      <div className={styles.toprightcontainer}>
        <img src={logo} className={styles.logo}/>
      </div>
      <h1 className={styles.blackHeading}>GPA Calculator</h1>
      
      <div>
        <label className={styles.blackHeading}>Grade:</label>
        <input
          type="text"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
          placeholder="A+,A,A-,B+,B,..."
        />
      </div>
      <div>
        <label className={styles.blackHeading}>Credit Hours:</label>
        <input
          type="text"
          value={creditHours}
          onChange={(e) => setCreditHours(e.target.value)}
          placeholder="1,2,3,4,..."
        />
      </div>
      <button className={styles.button} onClick={handleAddGrade}>Add Grade</button>
      <button className={styles.button} onClick={calculateSemesterGPA}>Calculate Semester GPA</button>
      <div>
        <h2 className={styles.blackHeading}>Grades</h2>
        <ul>
          {grades.map((g, index) => (
            <li key={index} className={styles.blackHeading}>
              Grade: {g.grade}, Credit Hours: {g.creditHours}
              <button className={styles.deletebutton} onClick={() => handleDeleteGrade(index)}>Delete</button>
            </li>
          ))}
        </ul>
        {semesterGPA !== null && (
          <div>
            <h2 className={styles.blackHeading}>Semester GPA:</h2>
            <p>{isNaN(semesterGPA) ? "Invalid input" : semesterGPA}</p>
          </div>
        )}
      </div>
      <div>
        <label className={styles.blackHeading}>Previous GPA:</label>
        <input
          type="text"
          value={previousGPA}
          onChange={(e) => setPreviousGPA(e.target.value)}
          placeholder="eg. 3.67"
        />
      </div>
      <div>
        <label className={styles.blackHeading}>Previous Credit Hours:</label>
        <input
          type="text"
          value={previousCreditHours}
          onChange={(e) => setPreviousCreditHours(e.target.value)}
          placeholder="eg. 57"
        />
      </div>
      <button className={styles.button} onClick={calculatecumulativeGPA}>Calculate Cumulative GPA</button>
      {cumulativeGPA !== null && (
        <div>
          <h2 className={styles.blackHeading}>Cumulative GPA:</h2>
          <p>{isNaN(cumulativeGPA) ? "Invalid input" : cumulativeGPA}</p>
        </div>
      )}
      <div><button className={styles.button} onClick={handleStartOver}>Start Over</button></div>
    </div>
  );
};

export default GradeCalculator;
