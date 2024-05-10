function showTime() {
    const date = new Date(); // 현재 날짜와 시간을 가져옴
    let hours = date.getHours(); // 시간
    let minutes = date.getMinutes(); // 분
    let seconds = date.getSeconds(); // 초
    let session = hours >= 12 ? 'PM' : 'AM';
  
    hours = hours % 12;
    hours = hours ? hours : 12; // 0시는 12시로 표시
    hours = hours < 10 ? '0' + hours : hours; // 한 자리 수 시간에 0을 붙임
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
  
    const time = `${hours}:${minutes}:${seconds} ${session}`;
    document.getElementById('clock').innerText = time;
  
    setTimeout(showTime, 1000); // 1초 후에 함수를 다시 실행
  }
  document.querySelectorAll('table.interactive').forEach(element => {
    element.addEventListener('click', (event) => {
      const row = event.path.find(element => element.tagName === 'TR' && element.parentElement.tagName === 'TBODY');
      if (row) {
        row.classList.toggle('highlighted');
      }
    })
  });
  showTime(); // 함수를 최초로 실행
  
// 요일별 시간표 (시간 범위 설정)
const weeklySchedule = {
    'Monday': [
      { start: '00:00', end: '08:40', activity: '잠' },
      { start: '08:40', end: '08:55', activity: '학교 갈 준비' },
      { start: '08:55', end: '09:00', activity: '통근' },
      { start: '09:00', end: '18:00', activity: '학교' },
      { start: '18:00', end: '24:00', activity: '개인공부' }
    ],
    'Tuesday': [
        { start: '00:00', end: '08:40', activity: '잠' },
        { start: '08:40', end: '08:55', activity: '학교 갈 준비' },
        { start: '08:55', end: '09:00', activity: '통근' },
        { start: '09:00', end: '18:00', activity: '학교' },
        { start: '18:00', end: '24:00', activity: '개인공부' }
    ],
    'Wednesday': [
        { start: '00:00', end: '08:40', activity: '잠' },
      { start: '08:40', end: '08:55', activity: '학교 갈 준비' },
      { start: '08:55', end: '09:00', activity: '통근' },
      { start: '09:00', end: '18:00', activity: '학교' },
      { start: '18:00', end: '24:00', activity: '개인공부' }
      ],
      'Thursday': [
        { start: '00:00', end: '08:40', activity: '잠' },
      { start: '08:40', end: '08:55', activity: '학교 갈 준비' },
      { start: '08:55', end: '09:00', activity: '통근' },
      { start: '09:00', end: '18:00', activity: '학교' },
      { start: '18:00', end: '24:00', activity: '개인공부' }
      ],
      'Friday': [
        { start: '00:00', end: '08:40', activity: '잠' },
      { start: '08:40', end: '08:55', activity: '학교 갈 준비' },
      { start: '08:55', end: '09:00', activity: '통근' },
      { start: '09:00', end: '18:00', activity: '학교' },
      { start: '18:00', end: '24:00', activity: '개인공부' }
      ]
  };
  
  // 시간 비교 함수
  function isCurrentTimeInRange(startTime, endTime, currentTime) {
    const [startHours, startMinutes] = startTime.split(':').map(Number);
    const [endHours, endMinutes] = endTime.split(':').map(Number);
    const [currentHours, currentMinutes] = currentTime.split(':').map(Number);
  
    const start = new Date();
    start.setHours(startHours, startMinutes, 0, 0);
  
    const end = new Date();
    end.setHours(endHours, endMinutes, 0, 0);
  
    const current = new Date();
    current.setHours(currentHours, currentMinutes, 0, 0);
  
    return current >= start && current <= end;
  }
  
  // 현재 시간과 시간표를 대조하여 메시지 표시
  function checkOwnerActivity() {
    const now = new Date();
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayName = dayNames[now.getDay()];
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const formattedHours = hours < 10 ? '0' + hours : '' + hours;
    const formattedMinutes = minutes < 10 ? '0' + minutes : '' + minutes;
    const currentTime = `${formattedHours}:${formattedMinutes}`;
  
    const daySchedule = weeklySchedule[dayName] || [];
    let activity = '운영자가 현재 활동 중이지 않습니다.';
  
    for (let i = 0; i < daySchedule.length; i++) {
      const scheduleItem = daySchedule[i];
      if (isCurrentTimeInRange(scheduleItem.start, scheduleItem.end, currentTime)) {
        activity = scheduleItem.activity;
        break;
      }
    }
  
    alert(`오늘은 ${dayName}입니다.\n현재 시간: ${currentTime}\n활동: ${activity}`);
  }
  
  // 버튼 클릭 이벤트 리스너 추가
  document.getElementById('ownerButton').addEventListener('click', checkOwnerActivity);
  
  document.getElementById('sendButton').addEventListener('click', function() {
    const message = document.getElementById('messageBox').value;
    
    if (message.trim() !== '') {
      // Google Form URL 및 Entry ID
      const formUrl = 'https://docs.google.com/forms/d/e/1FAIpQLScAkVowMyYKx_Y_JiqdeY-4NeZYEybKshRiX8in9DJ-8r67QA/formResponse';
      const data = new FormData();
      data.append('entry.1907667868', message); // entry.YOUR_ENTRY_ID 부분을 실제 Entry ID로 교체

      // 폼 데이터 제출
      fetch(formUrl, {
        method: 'POST',
        mode: 'no-cors',
        body: data
      }).then(() => {
        alert('메시지가 성공적으로 전송되었습니다.');
        document.getElementById('messageBox').value = ''; // 입력란 초기화
      }).catch((error) => {
        alert('메시지 전송에 실패했습니다.');
        console.error('Error:', error);
      });
    } else {
      alert('메시지를 입력하세요.');
    }
  });
  