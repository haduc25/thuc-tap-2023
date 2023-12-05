import React from 'react';

export default function Footer() {
    return (
        <footer className="bg-slate-200 p-4">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center">
                    <div className="text-slate-700">
                        {/* Add your footer content here */}© 2023 ThaiNguyenHome. All rights reserved.
                    </div>
                    <div className="flex gap-4">
                        <a href="/terms" className="text-slate-700 hover:underline">
                            Điều khoản dịch vụ
                        </a>
                        <a href="/privacy" className="text-slate-700 hover:underline">
                            Chính sách bảo mật
                        </a>
                        <a href="/contact" className="text-slate-700 hover:underline">
                            Liên hệ với chúng tôi
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
