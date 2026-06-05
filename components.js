/**
 * Vạn An Logistics - Shared Components & Global Logic
 * Quản lý tập trung Menu, Footer và các hiệu ứng chung
 */

document.addEventListener('DOMContentLoaded', () => {
    // 0. INJECT COMMON STYLES
    injectCommonStyles();

    // 1. INJECT COMPONENTS
    injectNavbar();
    injectFooter();
    injectFloatingContact();

    // 2. INITIALIZE EFFECTS
    initMobileMenu();
    initRevealObserver();
    setActiveLink();
    initBackToTop();
});


/**
 * Tự động chèn các mã CSS dùng chung cho Navbar (Dropdown, v.v.)
 */
function injectCommonStyles() {
    const styleId = 'van-an-common-styles';
    if (document.getElementById(styleId)) return;

    const style = document.createElement('style');
    style.id = styleId;
    style.innerHTML = `
        /* Dropdown Styles - Shared via components.js */
        .dropdown-content {
            opacity: 0;
            visibility: hidden;
            transform: translate(-50%, 10px);
            transition: all 0.3s ease;
        }
        .group:hover .dropdown-content {
            opacity: 1;
            visibility: visible;
            transform: translate(-50%, 0);
        }
    `;
    document.head.appendChild(style);
}

/**
 * Mã HTML cho Navigation Menu
 */
function injectNavbar() {
    const navbarPlaceholder = document.getElementById('navbar-placeholder');
    if (!navbarPlaceholder) return;

    const isSubPage = window.location.pathname.includes('/kien-thuc/');
    const base = isSubPage ? '../' : '';

    const navHTML = `
    <div class="fixed top-0 w-full z-50 transition-all duration-300 flex flex-col" id="main-header">
        <nav class="w-full bg-[#f5fbf4]/90 backdrop-blur-lg shadow-[0px_10px_30px_rgba(23,29,25,0.08)]">
            <div class="flex justify-between items-center max-w-7xl mx-auto px-6 lg:px-12 py-3 md:py-4">
                <a href="${base}index.html" class="flex items-center gap-3">
                    <img src="${base}assets/brand/Logo Vạn An - Ngang.png" alt="Vạn An Logistics" class="h-10 md:h-14 object-contain">
                </a>

                <div class="hidden md:flex items-center space-x-10 font-manrope text-[16px] font-bold tracking-tight text-emerald-900/70">
                    <a class="nav-link transition-colors duration-300" href="${base}index.html">Trang chủ</a>
                    <a class="nav-link transition-colors duration-300" href="${base}bang-gia.html">Bảng Giá</a>
                    
                    <div class="relative group">
                        <button class="flex items-center gap-1 hover:text-emerald-600 transition-colors duration-300 py-1 font-bold">
                            Dịch vụ
                            <span class="material-symbols-outlined text-sm">keyboard_arrow_down</span>
                        </button>
                        <div class="dropdown-content absolute left-1/2 -translate-x-1/2 mt-3 w-64 bg-white rounded-2xl shadow-[0px_20px_50px_rgba(23,29,25,0.15)] border border-outline-variant/20 p-2 z-50 overflow-hidden transform transition-all duration-300">
                            <a href="${base}uy-thac-xnk.html" class="block px-4 py-3 rounded-xl hover:bg-primary/5 text-on-surface transition-colors">
                                <div class="font-bold text-sm text-primary">Ủy Thác Xuất Nhập Khẩu</div>
                                <p class="text-[10px] text-on-surface-variant leading-tight mt-0.5">Giải pháp chính ngạch trọn gói</p>
                            </a>
                            <a href="${base}thanh-toan-ho-ali-wechat.html" class="block px-4 py-3 rounded-xl hover:bg-primary/5 text-on-surface transition-colors">
                                <div class="font-bold text-sm text-primary">Thanh toán Alipay - WeChat</div>
                                <p class="text-[10px] text-on-surface-variant leading-tight mt-0.5">Xử lý nhanh, tỷ giá siêu tốt</p>
                            </a>

                        </div>
                    </div>

                    <a class="nav-link transition-colors duration-300" href="${base}kien-thuc/">Kiến thức</a>
                    <a class="nav-link transition-colors duration-300" href="${base}chinh-sach.html">Chính Sách</a>
                </div>

                <div class="flex items-center gap-4">
                    <a href="https://zalo.me/0862341318" target="_blank" class="hidden md:block bg-primary text-on-primary px-7 py-3 rounded-xl font-black text-xs uppercase tracking-wider hover:scale-105 active:scale-95 transition-all shadow-lg btn-shine">
                        Nhận báo giá
                    </a>
                    <button id="mobile-menu-btn" class="md:hidden text-primary p-2">
                        <span class="material-symbols-outlined text-3xl">menu</span>
                    </button>
                </div>
            </div>

            <div id="mobile-menu" class="hidden md:hidden px-6 pb-6 animate-fade-in">
                <div class="flex flex-col space-y-2 bg-white/50 backdrop-blur-sm rounded-2xl p-4 border border-primary/5 shadow-xl">
                    <a href="${base}index.html" class="nav-link-mobile py-3 px-4 rounded-xl">Trang chủ</a>
                    <a href="${base}bang-gia.html" class="nav-link-mobile py-3 px-4 rounded-xl">Bảng Giá</a>
                    <div class="text-on-surface font-bold py-2 px-4">Dịch vụ</div>
                    <div class="pl-8 flex flex-col space-y-1">
                        <a href="${base}uy-thac-xnk.html" class="text-on-surface-variant text-sm py-2 hover:text-primary transition-colors">Ủy Thác Xuất Nhập Khẩu</a>
                        <a href="${base}thanh-toan-ho-ali-wechat.html" class="text-on-surface-variant text-sm py-2 hover:text-primary transition-colors">Thanh toán Alipay - WeChat</a>
                    </div>
                    <div class="text-on-surface font-bold py-2 px-4">Kiến thức</div>
                    <div class="pl-8 flex flex-col space-y-1">
                        <a href="${base}kien-thuc/" class="text-on-surface-variant text-sm py-2 hover:text-primary transition-colors">Tất cả bài viết</a>
                        <a href="${base}kien-thuc/van-chuyen-tieu-ngach.html" class="text-on-surface-variant text-sm py-2 hover:text-primary transition-colors">Vận chuyển Tiểu ngạch</a>
                    </div>
                    <a href="${base}chinh-sach.html" class="nav-link-mobile py-3 px-4 rounded-xl">Chính Sách</a>
                    <a href="https://zalo.me/0862341318" target="_blank" class="bg-primary text-on-primary px-6 py-4 rounded-xl font-black text-xs uppercase tracking-wider text-center mt-2 shadow-lg">Nhận Báo Giá</a>
                </div>
            </div>
        </nav>
    </div>
    `;
    navbarPlaceholder.outerHTML = navHTML;
}

/**
 * Mã HTML cho Footer
 */
function injectFooter() {
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (!footerPlaceholder) return;

    const isSubPage = window.location.pathname.includes('/kien-thuc/');
    const base = isSubPage ? '../' : '';

    const footerHTML = `
    <footer class="bg-[#0a0a09] w-full rounded-t-[2rem] md:rounded-t-[5rem] relative overflow-hidden shadow-[0_-20px_50px_rgba(0,0,0,0.1)]">
        <div class="absolute inset-0 dot-pattern opacity-10"></div>
        <div class="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-12 pb-20">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                <!-- Brand & Contact -->
                <div class="flex flex-col reveal reveal-up">
                    <img src="${base}assets/brand/Logo Trắng.png" alt="Vạn An Logistics" class="h-16 object-contain w-fit mb-8">
                    <h4 class="text-primary-container font-black text-sm sm:text-base uppercase mb-2 leading-tight">
                        CÔNG TY TNHH KINH DOANH THƯƠNG MẠI XUẤT NHẬP KHẨU TRƯỜNG VẠN AN
                    </h4>
                    <p class="text-white/40 text-[10px] font-bold uppercase tracking-wider mb-6">Viết tắt: TVA BTIMEX CO., LTD</p>
                    <ul class="space-y-4 text-white/60 text-xs mb-8">
                        <li class="flex items-start gap-3"><span class="material-symbols-outlined text-[16px] mt-0.5">id_card</span><span>MST: <strong>0111472093</strong></span></li>
                        <li class="flex items-start gap-3"><span class="material-symbols-outlined text-[16px] mt-0.5">location_on</span><span>VPHN: SA35 Khu liền kề FLC, Đại Mỗ, Hà Nội</span></li>
                        <li class="flex items-start gap-3">
                            <span class="material-symbols-outlined text-[16px] mt-1">call</span>
                            <div class="flex flex-col gap-1">
                                <a href="tel:0862341318" class="hover:text-primary transition-colors">Hotline 1: <strong>086.234.1318</strong></a>
                                <a href="tel:0986465678" class="hover:text-primary transition-colors">Hotline 2: <strong>0986.465.678</strong></a>
                            </div>
                        </li>
                    </ul>
                    <div class="flex gap-3 mb-8">
                        <a href="https://www.facebook.com/XNKVanAn" target="_blank" class="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-[#1877F2] hover:text-white transition-all duration-300 group">
                            <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                            </svg>
                        </a>
                        <a href="https://zalo.me/0862341318" target="_blank" class="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 group"><img src="${base}assets/brand/Icon_of_Zalo.svg.png" alt="Zalo" class="w-5 h-5 opacity-80 group-hover:opacity-100"></a>
                    </div>
                </div>

                <!-- Info -->
                <div class="reveal reveal-up delay-100">
                    <h4 class="text-white text-xs font-black uppercase tracking-widest mb-10 border-b border-primary w-fit pb-2">Thông tin chung</h4>
                    <ul class="space-y-3 text-white/40 text-xs text-left">
                        <li><a href="${base}index.html" class="hover:text-white flex items-center gap-2"><span class="text-[10px] text-primary">❯</span> Trang chủ</a></li>
                        <li><a href="${base}kien-thuc/" class="hover:text-white flex items-center gap-2"><span class="text-[10px] text-primary">❯</span> Kiến thức Logistics</a></li>
                        <li><a href="${base}kien-thuc/van-chuyen-tieu-ngach.html" class="hover:text-white flex items-center gap-2"><span class="text-[10px] text-primary">❯</span> Vận chuyển Tiểu ngạch</a></li>
                        <li><a href="${base}chinh-sach.html" class="hover:text-white flex items-center gap-2"><span class="text-[10px] text-primary">❯</span> Chính sách bảo mật</a></li>
                        <li><a href="${base}chinh-sach.html#khieu-nai" class="hover:text-white flex items-center gap-2"><span class="text-[10px] text-primary">❯</span> Chính sách khiếu nại</a></li>
                        <li><a href="${base}chinh-sach.html" class="hover:text-white flex items-center gap-2"><span class="text-[10px] text-primary">❯</span> Chính sách giao hàng</a></li>
                    </ul>
                </div>

                <!-- Services -->
                <div class="reveal reveal-up delay-200">
                    <h4 class="text-white text-xs font-black uppercase tracking-widest mb-10 border-b border-primary w-fit pb-2">Dịch vụ</h4>
                    <ul class="space-y-3 text-white/40 text-xs">
                        <li><a href="${base}uy-thac-xnk.html" class="hover:text-white flex items-center gap-2"><span class="text-[10px] text-primary">❯</span> Ủy Thác Xuất Nhập Khẩu</a></li>
                        <li><a href="${base}thanh-toan-ho-ali-wechat.html" class="hover:text-white flex items-center gap-2"><span class="text-[10px] text-primary">❯</span> Thanh toán hộ Alipay, WeChat</a></li>

                        <li><a href="${base}tra-cuoc.html" class="hover:text-white flex items-center gap-2"><span class="text-[10px] text-primary">❯</span> Tra cước vận chuyển</a></li>
                    </ul>
                </div>

                <!-- Map -->
                <div class="reveal reveal-up delay-300">
                    <h4 class="text-white text-xs font-black uppercase tracking-widest mb-10 border-b border-primary w-fit pb-2">Trụ sở chính</h4>
                    <div class="rounded-2xl overflow-hidden border border-white/10 h-48 bg-white/5">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2634.0319416567754!2d105.75315233995134!3d20.989281893058266!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31345314e5bde609%3A0x7c8e02352c81595c!2sHH2%20FLC%20Garden%20City!5e0!3m2!1svi!2s!4v1776152702920!5m2!1svi!2s" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
                    </div>
                </div>
            </div>

            <!-- Bottom Bar -->
            <div class="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-white/20 font-bold uppercase tracking-widest">
                <div class="flex flex-col md:flex-row items-center gap-4">
                    <p>© 2024 Vạn An Logistics. All rights reserved.</p>
                    <a href="//www.dmca.com/Protection/Status.aspx?ID=e605e2df-8b49-4ada-b307-6accb363f086" title="DMCA.com Protection Status" class="dmca-badge"> 
                        <img src ="https://images.dmca.com/Badges/dmca_protected_sml_120m.png?ID=e605e2df-8b49-4ada-b307-6accb363f086"  alt="DMCA.com Protection Status" class="h-6"/>
                    </a>
                    <script src="https://images.dmca.com/Badges/DMCABadgeHelper.min.js"> </script>
                </div>
                <div class="flex gap-6">
                    <a href="#" class="hover:text-primary">Chính sách</a>
                    <a href="#" class="hover:text-primary">Điều khoản</a>
                </div>
            </div>
        </div>
    </footer>
    `;
    footerPlaceholder.outerHTML = footerHTML;
}

/**
 * Mã HTML cho Nút liên hệ nổi
 */
function injectFloatingContact() {
    const contactPlaceholder = document.getElementById('contact-placeholder');
    if (!contactPlaceholder) return;

    const contactHTML = `
    <div class="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 flex flex-col items-center gap-2 md:gap-3 no-print">
        <!-- Back to Top -->
        <button id="back-to-top" class="w-12 h-12 md:w-14 md:h-14 bg-white border border-outline-variant/20 text-primary rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 translate-y-10 opacity-0 pointer-events-none hover:bg-surface-container-low active:scale-95 group mb-2">
            <span class="material-symbols-outlined text-2xl group-hover:-translate-y-1 transition-transform">keyboard_arrow_up</span>
        </button>

        <!-- Call -->
        <a href="tel:0862341318" class="group relative w-12 h-12 md:w-14 md:h-14 bg-primary hover:bg-primary-container rounded-full flex items-center justify-center shadow-2xl transition transform hover:scale-110">
            <span class="material-symbols-outlined text-white text-xl md:text-2xl">call</span>
            <span class="absolute right-full mr-3 bg-on-surface text-white text-xs font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition pointer-events-none">Gọi ngay</span>
        </a>
        <!-- Messenger -->
        <a href="https://www.facebook.com/XNKVanAn" target="_blank" class="group relative w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-2xl transition transform hover:scale-110">
            <svg class="w-6 h-6 md:w-7 md:h-7 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.145 2 11.243c0 2.908 1.434 5.503 3.678 7.2V22l3.455-1.9c.92.256 1.9.393 2.867.393 5.523 0 10-4.145 10-9.243S17.523 2 12 2zm1.059 12.439l-2.563-2.736-4.997 2.736 5.497-5.836 2.625 2.736 4.935-2.736-5.497 5.836z"/></svg>
            <span class="absolute right-full mr-3 bg-on-surface text-white text-xs font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition pointer-events-none">Messenger</span>
        </a>
        <!-- Zalo -->
        <a href="https://zalo.me/0862341318" target="_blank" class="group relative w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center shadow-2xl transition transform hover:scale-110 animate-pulse-subtle overflow-hidden bg-white">
            <img src="https://page.widget.zalo.me/static/images/2.0/Logo.svg" alt="Zalo" class="w-12 h-12 md:w-14 md:h-14">
            <span class="absolute right-full mr-3 bg-on-surface text-white text-xs font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition pointer-events-none">Chat Zalo</span>
        </a>
    </div>
    `;
    contactPlaceholder.outerHTML = contactHTML;
}


/**
 * Logic mở/đóng Menu Mobile
 */
function initMobileMenu() {
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    if (btn && menu) {
        btn.addEventListener('click', () => {
            menu.classList.toggle('hidden');
        });
    }
}

/**
 * Logic hiệu ứng hiện dần khi cuộn trang
 */
function initRevealObserver() {
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    };
    const revealObserver = new IntersectionObserver(revealCallback, { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
}

/**
 * Tự động tô đậm mục Menu của trang hiện tại
 */
function setActiveLink() {
    const currentHref = window.location.href;
    
    // Desktop Links
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.href === currentHref) {
            link.classList.add('text-primary');
            link.classList.remove('text-emerald-900/70', 'hover:text-emerald-600');
        } else {
            link.classList.add('hover:text-emerald-600');
        }
    });

    // Mobile Links
    document.querySelectorAll('.nav-link-mobile').forEach(link => {
        if (link.href === currentHref) {
            link.classList.add('text-primary', 'bg-primary/5', 'font-bold');
        } else {
            link.classList.add('text-on-surface', 'font-bold', 'hover:bg-primary/5');
        }
    });
}

/**
 * Logic nút Back to Top - Hiện và cuộn lên đầu trang
 */
function initBackToTop() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            btn.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-10');
            btn.classList.add('opacity-100', 'pointer-events-auto', 'translate-y-0');
        } else {
            btn.classList.add('opacity-0', 'pointer-events-none', 'translate-y-10');
            btn.classList.remove('opacity-100', 'pointer-events-auto', 'translate-y-0');
        }
    });

    btn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
