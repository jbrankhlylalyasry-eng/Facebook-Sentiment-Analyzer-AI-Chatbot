// تهيئة وإدارة الرسوم البيانية
const chartInstances = {};

// تهيئة مخطط المشاعر
function initSentimentChart() {
    const ctx = document.getElementById('sentimentChart');
    if (!ctx) return;
    
    chartInstances.sentiment = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['إيجابي', 'سلبي', 'محايد'],
            datasets: [{
                data: [70, 20, 10],
                backgroundColor: ['#10b981', '#ef4444', '#6b7280'],
                borderWidth: 0,
                hoverOffset: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '60%',
            plugins: {
                legend: {
                    position: 'bottom',
                    rtl: true,
                    labels: {
                        usePointStyle: true,
                        padding: 20,
                        font: {
                            family: 'Tajawal',
                            size: 12
                        },
                        color: '#374151'
                    }
                },
                tooltip: {
                    rtl: true,
                    bodyFont: {
                        family: 'Tajawal'
                    },
                    titleFont: {
                        family: 'Tajawal'
                    }
                }
            }
        }
    });
}

// تهيئة مخطط التقدم الزمني
function initTimelineChart() {
    const ctx = document.getElementById('timelineChart');
    if (!ctx) return;
    
    chartInstances.timeline = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو'],
            datasets: [
                {
                    label: 'إيجابي',
                    data: [65, 59, 70, 71, 66, 70],
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    tension: 0.3,
                    fill: true
                },
                {
                    label: 'سلبي',
                    data: [28, 35, 20, 25, 30, 20],
                    borderColor: '#ef4444',
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    tension: 0.3,
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    rtl: true,
                    labels: {
                        usePointStyle: true,
                        font: {
                            family: 'Tajawal'
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        font: {
                            family: 'Tajawal'
                        }
                    }
                },
                x: {
                    ticks: {
                        font: {
                            family: 'Tajawal'
                        }
                    }
                }
            }
        }
    });
}

// تحديث البيانات في المخططات
function updateCharts(data) {
    if (chartInstances.sentiment) {
        chartInstances.sentiment.data.datasets[0].data = data.sentiment;
        chartInstances.sentiment.update();
    }
    
    if (chartInstances.timeline) {
        chartInstances.timeline.data.datasets[0].data = data.positiveTrend;
        chartInstances.timeline.data.datasets[1].data = data.negativeTrend;
        chartInstances.timeline.update();
    }
}

// تهيئة جميع المخططات عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    initSentimentChart();
    initTimelineChart();
});
