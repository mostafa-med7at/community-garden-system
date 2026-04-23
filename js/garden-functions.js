// Community Garden System - Shared JS

// Navbar active state
document.addEventListener('DOMContentLoaded', function () {
    const currentPage = window.location.pathname.split('/').pop();
    document.querySelectorAll('.navbar-nav .nav-link, .dropdown-item').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
            const parent = link.closest('.dropdown');
            if (parent) parent.querySelector('.nav-link').classList.add('active');
        }
    });
});

// Toast notification
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast-notification toast-${type}`;
    toast.innerHTML = `<i class="fas fa-${type === 'success' ? 'check-circle' : type === 'warning' ? 'exclamation-triangle' : 'times-circle'} me-2"></i>${message}`;
    toast.style.cssText = `
        position:fixed; bottom:24px; right:24px; z-index:9999;
        background:${type === 'success' ? '#348E38' : type === 'warning' ? '#ffc107' : '#dc3545'};
        color:${type === 'warning' ? '#000' : '#fff'}; padding:14px 20px;
        border-radius:10px; box-shadow:0 4px 16px rgba(0,0,0,.2);
        font-weight:500; animation:slideUp .3s ease;
    `;
    document.body.appendChild(toast);
    setTimeout(() => { toast.style.opacity = '0'; toast.style.transition = 'opacity .4s'; setTimeout(() => toast.remove(), 400); }, 3000);
}

// Form validation helper
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return false;
    let valid = true;
    form.querySelectorAll('[required]').forEach(field => {
        if (!field.value.trim()) {
            field.classList.add('is-invalid');
            valid = false;
        } else {
            field.classList.remove('is-invalid');
            field.classList.add('is-valid');
        }
    });
    return valid;
}

// Status color helper
function getStatusClass(status) {
    const map = { 'Active': 'status-active', 'Pending': 'status-pending', 'Expired': 'status-expired', 'In Repair': 'status-repair', 'Available': 'status-active', 'Checked Out': 'status-pending' };
    return map[status] || 'status-pending';
}

// Simple chart bars
function renderBar(containerId, data) {
    const el = document.getElementById(containerId);
    if (!el) return;
    const max = Math.max(...data.map(d => d.value));
    el.innerHTML = data.map(d => `
        <div class="d-flex align-items-center mb-2 gap-2">
            <span style="width:120px;font-size:.85rem">${d.label}</span>
            <div class="flex-grow-1 bg-light rounded" style="height:22px">
                <div class="rounded" style="width:${(d.value/max*100).toFixed(0)}%;height:22px;background:var(--primary);transition:width .8s ease;display:flex;align-items:center;padding-left:8px">
                    <span style="color:#fff;font-size:.75rem;font-weight:600">${d.value}</span>
                </div>
            </div>
        </div>
    `).join('');
}
