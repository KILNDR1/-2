// إعداد Firebase
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
  };
  
  const app = firebase.initializeApp(firebaseConfig);
  const database = firebase.database(app);
  
  // التحقق من أن المستخدم لم يرسل الاستطلاع من قبل
  const userSubmitted = localStorage.getItem('surveySubmitted');
  
  // التحقق من حالة إرسال البيانات
  if (userSubmitted) {
    document.getElementById('surveyForm').style.display = 'none';
    document.getElementById('thankYouMessage').style.display = 'block';
    document.getElementById('userName').textContent = localStorage.getItem('userName');
  } else {
    // إخفاء رسالة الشكر في البداية
    document.getElementById('thankYouMessage').style.display = 'none';
  }
  
  // إرسال البيانات إلى Firebase
  document.getElementById('surveyForm').addEventListener('submit', function(e) {
    e.preventDefault();
  
    const name = document.getElementById('name').value;
    const q1 = document.getElementById('q1').value;
    const q2 = document.getElementById('q2').value;
    const q3 = document.getElementById('q3').value;
    const q4 = document.getElementById('q4').value;
  
    // إرسال البيانات إلى Firebase إذا كانت الإجابات مكتملة
    if (name && q1 && q2 && q3 && q4) {
      const userData = {
        name: name,
        q1: q1,
        q2: q2,
        q3: q3,
        q4: q4
      };
  
      // إرسال البيانات إلى قاعدة بيانات Firebase
      firebase.database().ref('surveyResponses').push(userData)
        .then(() => {
          // حفظ حالة الإرسال في localStorage
          localStorage.setItem('surveySubmitted', 'true');
          localStorage.setItem('userName', name);
  
          // إخفاء النموذج وعرض رسالة شكر
          document.getElementById('surveyForm').style.display = 'none';
          document.getElementById('thankYouMessage').style.display = 'block';
          document.getElementById('userName').textContent = name;
        });
    } else {
      alert('يرجى الإجابة على جميع الأسئلة.');
    }
  });