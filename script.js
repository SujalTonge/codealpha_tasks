function calculateAge() {
    let dobInput = document.getElementById('dob').value;
    let result = document.getElementById('result');
    
    if (!dobInput) {
        result.innerText = "Please enter your date of birth.";
        result.style.color = "#ff6a88";
        return;
    }
    
    let dob = new Date(dobInput);
    if (isNaN(dob.getTime())) {
        result.innerText = "Invalid date format. Please use YYYY-MM-DD.";
        result.style.color = "#ff6a88";
        return;
    }

    let today = new Date();
    
    let years = today.getFullYear() - dob.getFullYear();
    let months = today.getMonth() - dob.getMonth();
    let days = today.getDate() - dob.getDate();
    
    if (days < 0) {
        months--;
        let prevMonthDate = new Date(today.getFullYear(), today.getMonth(), 0);
        days += prevMonthDate.getDate();
    }
    if (months < 0) {
        years--;
        months += 12;
    }
    
    result.innerText = `Your age is: ${years} years, ${months} months, and ${days} days.`;
    result.style.color = "#fff";
}
