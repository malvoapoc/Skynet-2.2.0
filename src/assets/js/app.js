(function () {
    'use strict';

    function isInElectron() {

        if (typeof process !== 'undefined' &&
            process.versions &&
            process.versions.electron) {
            return true;
        }

        if (typeof navigator !== 'undefined' &&
            navigator.userAgent &&
            navigator.userAgent.toLowerCase().includes('electron')) {
            return true;
        }

        if (typeof require === 'function') {
            try {
                const electron = require('electron');
                if (electron) {
                    return true;
                }
            } catch (e) {

            }
        }

        if (typeof window !== 'undefined') {
            if (window.process && window.process.type === 'renderer') {
                return true;
            }
            if (window.electronAPI || window.electron) {
                return true;
            }
        }

        return false;
    }

    function isInRealBrowser() {

        if (typeof process !== 'undefined' &&
            process.versions &&
            process.versions.electron) {
            return false;
        }

        if (typeof window !== 'undefined' && window.location) {
            const protocol = window.location.protocol;
            if (protocol === 'http:' || protocol === 'https:') {
                if (typeof process !== 'undefined' &&
                    process.versions &&
                    process.versions.electron) {
                    return false;
                }
                return true;
            }
        }

        if (typeof navigator !== 'undefined' && navigator.userAgent) {
            const ua = navigator.userAgent;
            const hasElectron = ua.includes('Electron');

            if (!hasElectron) {

                const isBrowserUA = ua.includes('Chrome/') ||
                    ua.includes('Firefox/') ||
                    ua.includes('Safari/') ||
                    ua.includes('Edge/') ||
                    ua.includes('Opera/');

                if (isBrowserUA) {
                    return true;
                }
            }
        }

        if (typeof require === 'undefined' &&
            typeof process === 'undefined' &&
            typeof global === 'undefined') {
            return true;
        }

        return false;
    }

    const runningInElectron = isInElectron();
    const runningInBrowser = isInRealBrowser();

    if (!runningInElectron || runningInBrowser) {
        document.documentElement.innerHTML = `
            <html>
            <head>
                <title>访问被拒绝</title>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <style>
                    body {
                        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                        text-align: center;
                        padding: 20px;
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        color: #333;
                        margin: 0;
                        min-height: 100vh;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                    .error-container {
                        background: white;
                        padding: 40px 30px;
                        border-radius: 15px;
                        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
                        max-width: 500px;
                        width: 90%;
                        animation: fadeIn 0.5s ease-in;
                    }
                    @keyframes fadeIn {
                        from { opacity: 0; transform: translateY(20px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                    .error-icon {
                        font-size: 64px;
                        margin-bottom: 20px;
                        animation: pulse 2s infinite;
                    }
                    @keyframes pulse {
                        0%, 100% { transform: scale(1); }
                        50% { transform: scale(1.1); }
                    }
                    .error-title {
                        font-size: 28px;
                        font-weight: bold;
                        margin-bottom: 15px;
                        color: #e74c3c;
                    }
                    .error-message {
                        font-size: 16px;
                        line-height: 1.6;
                        margin-bottom: 25px;
                        color: #555;
                    }
                    .error-details {
                        background: #f8f9fa;
                        padding: 15px;
                        border-radius: 8px;
                        margin-bottom: 20px;
                        border-left: 4px solid #e74c3c;
                    }
                    .error-code {
                        font-size: 12px;
                        color: #666;
                        font-family: 'Courier New', monospace;
                        background: #f1f2f6;
                        padding: 10px;
                        border-radius: 5px;
                        word-break: break-all;
                    }
                    .warning-text {
                        color: #e67e22;
                        font-weight: bold;
                        margin-top: 15px;
                    }
                </style>
            </head>
            <body>
                <div class="error-container">
                    <div class="error-icon">🚫</div>
                    <div class="error-title">访问被拒绝</div>
                    <div class="error-message">
                        此应用只能通过官方桌面客户端访问。
                    </div>
                    <div class="error-details">
                        <strong>检测到的问题：</strong><br>
                        您正在使用浏览器直接访问此应用，出于安全考虑，访问已被阻止。
                    </div>
                    <div class="warning-text">
                        ⚠️ 请下载并使用官方 Electron 桌面应用
                    </div>
                    <div class="error-code">
                        错误代码: BROWSER_ACCESS_DENIED<br>
                        访问协议: ${window.location.protocol}<br>
                        用户代理: ${navigator.userAgent.substring(0, 100)}...<br>
                        时间戳: ${new Date().toISOString()}
                    </div>
                </div>
                <script>

                    window.addEventListener('beforeunload', function(e) {
                        e.preventDefault();
                        return '访问被拒绝';
                    });

                    document.addEventListener('keydown', function(e) {
                        if (e.key === 'F12' ||
                            (e.ctrlKey && e.shiftKey && e.key === 'I') ||
                            (e.ctrlKey && e.shiftKey && e.key === 'C') ||
                            (e.ctrlKey && e.key === 'u')) {
                            e.preventDefault();
                            return false;
                        }
                    });

                    document.addEventListener('contextmenu', function(e) {
                        e.preventDefault();
                        return false;
                    });

                    window.stop();
                    throw new Error('Browser access denied');
                </script>
            </body>
            </html>
        `;

        throw new Error('❌ 安全违规：检测到浏览器环境访问，程序已终止！');
    }

})();

const remote = require('electron').remote
const { shell, app } = require('electron')

const ipc = require('electron').ipcRenderer;
const currentWindow = remote.getCurrentWindow();
const path = require('path')

function onClickControl(element, data) {
    ipc.send('onClickControl', element, data)
}

const fs = require("fs")

const net = require('net')
const crypto = require('crypto')

const _appname = "Skynet"
const _app = remote.app
const appConfigDir = path.join(_app.getPath('appData'), _appname)
const configPath = path.join(appConfigDir, `config.yaml`)

const FILE_INTEGRITY_HASHES = {};

function verifyFileIntegrity(filePath, expectedHash) {
    try {
        const appPath = remote.app.getAppPath();
        const possiblePaths = [
            path.join(appPath, filePath),
            path.join(appPath + '.unpacked', filePath),
            path.join(path.dirname(appPath), filePath),
            path.join(path.dirname(appPath), 'app', filePath)
        ];

        let fullPath = null;
        let fileExists = false;

        for (const testPath of possiblePaths) {
            if (fs.existsSync(testPath)) {
                fullPath = testPath;
                fileExists = true;
                break;
            }
        }

        if (!fileExists || !fullPath) {
            return false;
        }

        const fileContent = fs.readFileSync(fullPath);
        const fileHash = crypto.createHash('sha256').update(fileContent).digest('hex');

        if (fileHash !== expectedHash) {
            return false;
        }

        return true;
    } catch (error) {
        return false;
    }
}


function isDevMode() {
    try {
        const appPath = remote.app.getAppPath();
        const isDev = !appPath.includes('.asar');
        const hasNodeModules = fs.existsSync(path.join(appPath, 'node_modules'));
        return isDev || hasNodeModules;
    } catch (error) {
        return false;
    }
}

function verifyAllFiles() {
    const hashEntries = Object.entries(FILE_INTEGRITY_HASHES);

    if (isDevMode()) {
        return true;
    }

    if (hashEntries.length === 0) {
        return true;
    }

    let allPassed = true;
    for (const [filePath, expectedHash] of hashEntries) {
        const passed = verifyFileIntegrity(filePath, expectedHash);
        if (!passed) {
            allPassed = false;
        } else {
        }
    }

    return allPassed;
}

(function () {
    try {
        const integrityCheckPassed = verifyAllFiles();

        if (!integrityCheckPassed) {

            alert(
                '严重安全警告：检测到应用文件被篡改或丢失！\n\n' +
                '为了您的数据安全，应用将立即退出。\n\n' +
                '请重新安装应用或联系技术支持。'
            );

            if (typeof remote !== 'undefined' && remote.app) {
                remote.app.exit(1); // 使用 exit(1) 表示异常退出
            } else if (typeof window !== 'undefined') {
                window.close();
            }

            try {
                process.exit(1);
            } catch (e) {
                throw new Error('[安全] 文件完整性验证失败，阻止应用继续运行');
            }
        }
    } catch (error) {
        alert(
            '严重安全警告：文件完整性验证过程失败！\n\n' +
            '应用将立即退出。\n\n' +
            '请重新安装应用。'
        );
        if (typeof remote !== 'undefined' && remote.app) {
            remote.app.exit(1);
        }
        try {
            process.exit(1);
        } catch (e) {
            throw error;
        }
    }
})();

Vue.directive('remove-spaces', {
    bind(el) {
        const handler = () => {
            const newValue = el.value.replace(/\s/g, '');
            if (newValue !== el.value) {
                el.value = newValue;
                el.dispatchEvent(new Event('input'));
            }
        }
        el.addEventListener('input', handler);
    }
});

const languagepack = {
    en: {
        lang: {
            lang: 'English',
            email: 'Email',
            password: 'Password',
            confirmpassword: 'Confirm Password',
            forgotpassword: 'Forgot password?',
            login: 'Login',
            nohaveanaccount: "Don't have an account?",
            register: 'Register',
            loggingin: 'Logging in',
            resetpassword: 'Reset Password',
            emailverificationcode: 'Email verification code',
            invitationcode: 'Invitation code',
            Invitationcodeoptional: 'Invitation code (optional)',
            send: 'Send',
            requesting: 'Requesting',
            emailinputerror: 'Incorrect email input',
            passwordinputerror: 'Incorrect password input',
            couponinputerror: "Coupon input error",
            incorrectverificationcodeinput: 'Incorrect verification code input',
            passwordlengtherr: 'Password must be greater than 8 digits',
            confirmationpassworddoesnotmatchthepassword: 'Confirmation password does not match the password',
            signup: 'Sign up',
            registering: "registering",
            backtologin: "Back to login",
            Passwordresetsuccessful: "Password reset successful",
            disconnect: "Disconnect",
            connected: "Connected",
            connecting: "Connecting",
            disconnecting: "Disconnecting",
            reconnecting: "Reconnecting",
            nodeselection: "Node selection",
            globalmode: "Global Mode",
            pacdesc: "Smart Mode: Acting for Overseas Regions",
            globaldesc: "Global mode: proxy all regions",
            accountinformation: "Account",
            onlinestore: "Online store",
            announcementcenter: "Announcement Center",
            helpcenter: "Help Center",
            dataupdate: "Data Update",
            updating: "updating",
            aboutus: "About us",
            logout: "Log out",
            storejumping: "Store jumping",
            home: "Home",
            about: "About",
            Announcementlist: "Announcement list",
            noannouncement: "No announcement",
            nohelpdocumentation: "No help documentation",
            balance: "balance",
            plan: "Plan",
            expiredate: "Expire date",
            Plantraffic: "Plan traffic",
            newversionfound: "New version found",
            updateversionnow: "Update version now",
            confirmlogout: "Confirm logout?",
            confirm: "Confirm",
            cancel: "Cancel",
            startErr: "Failed to start, please grant VPN permission",
            timeout: "timeout",
            pingTps: "Use delay function after disconnection",
            tggroup: "Official Group",
            website: "Official website",
            privacypolicy: "Privacy Policy",
            tos: "Terms of Service",
            more: "More",
            loading: "Loading",
            invitefriends: "invite friends",
            trafficwillresetafterday: "Traffic will reset after {day} day",
            preferences: "Preferences",
            languages: "Languages",
            upLoad: "Upload",
            downLoad: "Download",
            CopyExclusiveInvitationLink: "Copy Exclusive Invitation Link",
            copysuccessfully: "copy successfully",
            Clickthebuttontoconnect: "Click the btn to connect",
            Thecurrentaccountpackagehasexpired: "The current account plan has expired",
            Gotostore: "Go to store",
            AlreadypurchasedapackageRefreshdata: "Already purchased a package? Refresh data",
            used: "Used",
            total: "Total",
            AutoSelect: "Auto select",
            Theme: "Theme Settings",
            Not_configured_for_online_customer_service: "Not configured for online customer service",
            Online_customer_service_is_loading: "Online customer service is loading",
            Package_traffic_has_been_exhausted: "Package traffic has been exhausted",
            Haveacoupon: "Have a coupon?",
            coupon: "Coupon",
            choose: "Choose",
            PlaceAnOrder: "Place an Order",
            Selected: "Selected",
            SelectPaymentCycle: "Select Payment Cycle",
            month: "Monthly",
            quarter: "Quarterly",
            halfYear: "Half-Yearly",
            year: "Yearly",
            twoYear: "Two-Year",
            threeYear: "Three-Year",
            onetime: "One-time",
            trafficReset: "Traffic Reset Package",
            validating: "Validating",
            apply: "Apply",
            couponUsed: "Coupon Used",
            Purchasing: "Purchasing",
            PaymentMethods: "Payment Methods",
            DeductAccountBalanceByDefault: "Deduct Account Balance by Default",
            Confirmationofpayment: "Payment",
            AccountBalance: "Account Balance",
            AmountToBePaid: "Amount to be Paid",
            paid: "Paid",
            ContinueToPay: "Continue to Pay",
            CancelPayment: "Cancel Payment",
            handlingFee: "Handling Fee",
            OnlineCustomer: "Online Customer Service",
            CanceledUseOfCoupon: "Canceled Use of Coupon",
            Cancelled: "Cancelled",
            planPurchaseSuccessful: "Plan Purchase Successful",
            NoPayment: "Unpaid Order",
            Select_your_preferred_display_theme: "Select your preferred display theme",
            Package_traffic: "Package data",
            my_order: "My Orders",
            activation: "Activate",
            Expired: "Expired",
            After_turning_it_on_all_network_requests_will_go_through_VPN: "After turning it on, all network requests will go through VPN",
            No_package_suitable_for_you: "No package suitable for you?",
            Customized_services: "Customized Services",
            Contact_customer_service: "Contact Customer Service",
            Order_record: "Order Records",
            Search_orders: "Search orders...",
            Order_number: "Order Number",
            Package: "Package",
            Period: "Period",
            Date: "Date",
            Amount: "Amount",
            Status: "Status",
            No_data_found: "No data found",
            To_be_paid: "To be paid",
            Data_Overview: "Overview",
            My_Invitation: "Invitation",
            Commission_Record: "Commission Record",
            piece: "piece",
            language_theme: "Language | Theme",
            Send_us_message: "Contact us",
            Support_team_ready_to_help: "Support team ready to help",
            Language_Settings: "Language Settings",
            Select_your_preferred_language: "Select your preferred language",
            Order_information: "Order Information",
            Current_version: "Current version",
            Update_content: "Update content",
            Registered_user: "Registered User",
            Commission_ratio: "Commission Ratio",
            Commission_confirmed: "Commission Pending",
            Cumulative_commission_earned: "Cumulative Commission Earned",
            Generating: "Generating",
            Generate_invitation_code: "Generate Invitation Code",
            Invitation_link: "Invitation Link",
            Finish: "Finish",
            new_invitation_code_has_been_generated: "New invitation code has been generated",
            invitation_code_was_entered_incorrectly: "Invitation code was entered incorrectly",
            No_line_available: "No line available",
            Logout_successful: "Logout successful",
            Login_successful: "Login successful",
            Proxy_configuration: "Proxy Configuration",
            Port_TunMode: "Port｜TUN Mode",
            Network_proxy_settings: "Network Proxy Settings",
            Network_proxy_type: "Proxy Type",
            Network_proxy_address: "Proxy Address",
            Turned_on: "Turned On",
            Turned_off: "Not Enabled",
            TUN_Mode: "TUN Mode",
            View: "View",
            Current_Package: "Current Package",
            Connections: "Connect",
            My: "My",

            myTickets: "My Tickets",
            createTicket: "Create Ticket",
            ticketManagement: "Ticket Management",
            pendingReply: "Pending Reply",
            open: "Open",
            low: "Low",
            medium: "Medium",
            high: "High",
            closeTicket: "Close Ticket",
            details: "Details",
            ticketClosed: "Ticket Closed",
            replied: "Replied",
            ticketDetails: "Ticket Details",
            me: "Me",
            support: "Support",
            enterReplyContent: "Enter reply content...",
            sending: "Sending...",
            createNewTicket: "Create New Ticket",
            ticketTitle: "Ticket Title",
            priority: "Priority",
            ticketContent: "Ticket Content",
            describeIssue: "Describe your issue...",
            submitTicket: "Submit Ticket",
            submitting: "Submitting...",
            invalidReplyContent: "Please enter valid reply content",
            invalidTransferAmount: "Please enter a valid transfer amount",
            invalidWithdrawalAccount: "Please enter a valid withdrawal account",
            invalidTicketTitle: "Please enter a valid ticket title",
            invalidTicketContent: "Please enter valid ticket content",
            commission: "Commission",
            currentCommissionBalance: "Current Promotion Commission Balance",
            lastUpdated: "Last Updated",
            withdrawCommission: "Withdraw Commission",
            withdrawalAccount: "Withdrawal Account",
            enterWithdrawalAccount: "Please enter withdrawal account",
            applyWithdrawal: "Apply for Withdrawal",
            submittingApplication: "Submitting Application...",
            balanceTransfer: "Balance Transfer",
            transferToMainBalance: "Transfer promotion commission balance to main account balance",
            confirmTransfer: "Confirm Transfer",
            submittingTransfer: "Submitting Transfer...",
            enterTransferAmount: "Enter Transfer Amount",
            Closing: "Closing",
            Please_enter_a_ticket_title: "Please enter a ticket title"

        }
    },
    cn: {
        lang: {
            lang: '中文',
            email: '邮箱',
            password: '密码',
            confirmpassword: '确认密码',
            forgotpassword: '忘记密码?',
            login: '登录',
            nohaveanaccount: "没有账号?",
            register: '注册账号',
            loggingin: '正在登入',
            resetpassword: '重置密码',
            emailverificationcode: '邮箱验证码',
            invitationcode: '邀请码',
            Invitationcodeoptional: '邀请码(选填)',
            send: '发送',
            requesting: 'Requesting',
            emailinputerror: '邮箱输入错误',
            couponinputerror: '优惠券输入错误',
            passwordinputerror: '密码输入错误',
            incorrectverificationcodeinput: '验证码输入不正确',
            passwordlengtherr: '密码长度需大于八位数',
            confirmationpassworddoesnotmatchthepassword: '确认密码与密码不符',
            signup: '注册账号',
            registering: "正在注册",
            backtologin: "返回登入",
            Passwordresetsuccessful: "密码重置成功",
            disconnect: "未连接",
            connected: "已连接",
            connecting: "连接中",
            disconnecting: "断开中",
            reconnecting: "重连中",
            nodeselection: "节点选择",
            globalmode: "全局模式",
            pacdesc: "智能模式:代理海外地区",
            globaldesc: "全局模式:代理所有地区",
            accountinformation: "账号",
            onlinestore: "在线商店",
            announcementcenter: "公告中心",
            helpcenter: "帮助中心",
            dataupdate: "数据更新",
            updating: "更新中",
            aboutus: "关于我们",
            logout: "登出",
            storejumping: "商店跳转中",
            home: "首页",
            about: "关于",
            Announcementlist: "公告列表",
            noannouncement: "没有公告内容",
            nohelpdocumentation: "没有帮助文档",
            balance: "余额",
            plan: "套餐",
            expiredate: "到期时间",
            Plantraffic: "套餐流量",
            newversionfound: "发现新版本",
            updateversionnow: "立即更新版本",
            confirmlogout: "确认登出账号?",
            confirm: "确认",
            cancel: "取消",
            startErr: "启动失败,请授予VPN权限",
            timeout: "超时",
            pingTps: "断开连接后使用延迟功能",
            tggroup: "官方群组",
            website: "官网",
            privacypolicy: "隐私策略",
            tos: "服务条款",
            more: "更多",
            loading: "加载中",
            invitefriends: "邀请好友",
            trafficwillresetafterday: "流量将在{day}天后重置",
            preferences: "偏好设置",
            languages: "多语言",
            upLoad: "上传",
            downLoad: "下载",
            CopyExclusiveInvitationLink: "复制专属邀请链接",
            copysuccessfully: "复制成功",
            Clickthebuttontoconnect: "点击按钮进行连接",
            Thecurrentaccountpackagehasexpired: "当前套餐包账号已到期",
            Gotostore: "前往商店",
            used: "已用",
            total: "总计",
            AutoSelect: "自动选择",
            AlreadypurchasedapackageRefreshdata: "已购买套餐？ 刷新数据",
            Theme: "主题设置",
            Not_configured_for_online_customer_service: "未配置在线客服",
            Online_customer_service_is_loading: "在线客服加载中",
            Package_traffic_has_been_exhausted: "套餐包流量已用尽",
            Haveacoupon: "拥有优惠券?",
            coupon: "优惠券",
            choose: "选择",
            PlaceAnOrder: "下单",
            Selected: "已选择",
            SelectPaymentCycle: "选择付费周期",
            month: "月付",
            quarter: "季付",
            halfYear: "半年付",
            year: "年付",
            twoYear: "两年付",
            threeYear: "三年付",
            onetime: "一次性",
            trafficReset: "流量重置包",
            validating: "验证中",
            apply: "应用",
            couponUsed: "已使用优惠券",
            Purchasing: "购买中",
            PaymentMethods: "支付方式",
            DeductAccountBalanceByDefault: "默认抵扣账号余额",
            Confirmationofpayment: "付款",
            AccountBalance: "账号余额",
            AmountToBePaid: "待支付金额",
            paid: "已支付",
            ContinueToPay: "继续支付",
            CancelPayment: "取消支付",
            handlingFee: "手续费",
            OnlineCustomer: "在线客服",
            CanceledUseOfCoupon: "已取消使用优惠券",
            Cancelled: "已取消",
            planPurchaseSuccessful: "套餐购买成功",
            NoPayment: "未支付订单",
            Select_your_preferred_display_theme: "选择您喜欢的显示主题",//2.1.3+
            Package_traffic: "套餐包流量",
            my_order: "我的订单",
            activation: "激活",
            Expired: "已到期",
            After_turning_it_on_all_network_requests_will_go_through_VPN: "开启后所有网络请求都将通过VPN",
            No_package_suitable_for_you: "没有适合你的套餐？",
            Customized_services: "定制服务",
            Contact_customer_service: "联系客服",
            Order_record: "订单记录",
            Search_orders: "搜索订单...",
            Order_number: "订单号",
            Package: "套餐",
            Period: "周期",
            Date: "日期",
            Amount: "金额",
            Status: "状态",
            No_data_found: "没有找到数据",
            To_be_paid: "待支付",
            Data_Overview: "概览",
            My_Invitation: "邀请",
            Commission_Record: "记录",
            piece: "条",
            language_theme: "语言｜主题",
            Send_us_message: "联系我们",
            Support_team_ready_to_help: "支持团队随时提供帮助",
            Language_Settings: "语言设置",
            Select_your_preferred_language: "选择您的首选语言",
            Order_information: "订单信息",
            Current_version: "当前版本",
            Update_content: "更新内容",
            Registered_user: "已注册用户",
            Commission_ratio: "佣金比例",
            Commission_confirmed: "确认中佣金",
            Cumulative_commission_earned: "累计获得佣金",
            Generating: "正在生成",
            Generate_invitation_code: "生成邀请码",
            Invitation_link: "邀请链接",
            Finish: "完成",
            new_invitation_code_has_been_generated: "新的邀请码已生成",
            invitation_code_was_entered_incorrectly: "邀请码输入不正确",
            No_line_available: "没有线路可使用",
            Logout_successful: "登出成功",
            Login_successful: "登录成功",
            Proxy_configuration: "代理配置",
            Port_TunMode: "端口｜TUN模式",
            Network_proxy_settings: "网络代理设置",
            Network_proxy_type: "代理类型",
            Network_proxy_address: "代理地址",
            Turned_on: "已开启",
            Turned_off: "未开启",
            TUN_Mode: "网卡模式",
            View: "查看",
            Current_Package: "当前套餐",
            Connections: "连接",
            My: "我的",

            myTickets: "我的工单",
            createTicket: "新建工单",
            ticketManagement: "工单管理",
            pendingReply: "待回复",
            open: "开启",
            low: "低",
            medium: "中",
            high: "高",
            closeTicket: "关闭工单",
            details: "详情",
            ticketClosed: "工单已关闭",
            replied: "已回复",
            ticketDetails: "工单详情",
            me: "我",
            support: "客服",
            enterReplyContent: "输入回复内容…",
            sending: "发送中",
            createNewTicket: "创建新工单",
            ticketTitle: "工单标题",
            priority: "优先级",
            ticketContent: "工单内容",
            describeIssue: "描述你的问题…",
            submitTicket: "提交工单",
            submitting: "正在提交",
            invalidReplyContent: "请正确填写回复信息",
            invalidTransferAmount: "请正确填写划转金额",
            invalidWithdrawalAccount: "请正确填写提现账号",
            invalidTicketTitle: "请正确填写工单标题",
            invalidTicketContent: "请正确填写工单内容",
            commission: "佣金",
            currentCommissionBalance: "当前推广佣金余额",
            lastUpdated: "最后更新",
            withdrawCommission: "佣金提现",
            withdrawalAccount: "提现账号",
            enterWithdrawalAccount: "请输入提现账号",
            applyWithdrawal: "申请提现",
            submittingApplication: "正在提交申请",
            balanceTransfer: "余额划转",
            transferToMainBalance: "将推广佣金余额划转至主账户余额",
            confirmTransfer: "确认划转",
            submittingTransfer: "正在提交划转",
            enterTransferAmount: "输入划转金额",
            Closing: "关闭中",
            Please_enter_a_ticket_title: "请输入工单标题"

        }
    },
    kr: {
        lang: {
            lang: '한국어',
            email: '이메일',
            password: '비밀번호',
            confirmpassword: '비밀번호 확인',
            forgotpassword: '비밀번호를 잊으셨나요?',
            login: '로그인',
            nohaveanaccount: "계정이 없으신가요?",
            register: '회원가입',
            loggingin: '로그인 중',
            resetpassword: '비밀번호 재설정',
            emailverificationcode: '이메일 인증 코드',
            invitationcode: '초대 코드',
            Invitationcodeoptional: '초대 코드(선택 사항)',
            send: '보내기',
            requesting: '요청 중',
            emailinputerror: '이메일 입력 오류',
            couponinputerror: '쿠폰 입력 오류',
            passwordinputerror: '비밀번호 입력 오류',
            incorrectverificationcodeinput: '인증 코드가 올바르지 않습니다',
            passwordlengtherr: '비밀번호는 8자리 이상이어야 합니다',
            confirmationpassworddoesnotmatchthepassword: '비밀번호와 비밀번호 확인이 일치하지 않습니다',
            signup: '회원가입',
            registering: "등록 중",
            backtologin: "로그인으로 돌아가기",
            Passwordresetsuccessful: "비밀번호 재설정 성공",
            disconnect: "연결 해제됨",
            connected: "연결됨",
            connecting: "연결 중",
            disconnecting: "연결 해제 중",
            reconnecting: "재연결 중",
            nodeselection: "노드 선택",
            globalmode: "전체 모드",
            pacdesc: "스마트 모드: 해외 지역만 프록시",
            globaldesc: "전체 모드: 모든 지역 프록시",
            accountinformation: "계정 정보",
            onlinestore: "온라인 스토어",
            announcementcenter: "공지 센터",
            helpcenter: "도움말 센터",
            dataupdate: "데이터 업데이트",
            updating: "업데이트 중",
            aboutus: "회사 소개",
            logout: "로그아웃",
            storejumping: "스토어로 이동 중",
            home: "홈",
            about: "소개",
            Announcementlist: "공지 목록",
            noannouncement: "공지 내용 없음",
            nohelpdocumentation: "도움말 문서 없음",
            balance: "잔액",
            plan: "플랜",
            expiredate: "만료일",
            Plantraffic: "플랜 트래픽",
            newversionfound: "새 버전 발견",
            updateversionnow: "지금 업데이트",
            confirmlogout: "로그아웃하시겠습니까?",
            confirm: "확인",
            cancel: "취소",
            startErr: "시작 실패, VPN 권한을 허용하세요",
            timeout: "시간 초과",
            pingTps: "연결 해제 후 지연 기능 사용",
            tggroup: "공식 그룹",
            website: "공식 웹사이트",
            privacypolicy: "개인정보 처리방침",
            tos: "서비스 약관",
            more: "더 보기",
            loading: "로딩 중",
            invitefriends: "친구 초대",
            trafficwillresetafterday: "{day}일 후 트래픽이 초기화됩니다",
            preferences: "환경 설정",
            languages: "언어",
            upLoad: "업로드",
            downLoad: "다운로드",
            CopyExclusiveInvitationLink: "전용 초대 링크 복사",
            copysuccessfully: "복사 성공",
            Clickthebuttontoconnect: "버튼을 클릭하여 연결",
            Thecurrentaccountpackagehasexpired: "현재 계정 플랜이 만료되었습니다",
            Gotostore: "스토어로 이동",
            used: "사용됨",
            total: "총계",
            AutoSelect: "자동 선택",
            AlreadypurchasedapackageRefreshdata: "플랜을 이미 구매하셨나요? 데이터 새로고침",
            Theme: "테마 설정",
            Not_configured_for_online_customer_service: "온라인 고객센터가 설정되지 않음",
            Online_customer_service_is_loading: "온라인 고객센터 로딩 중",
            Package_traffic_has_been_exhausted: "플랜 트래픽이 모두 소진되었습니다",
            Haveacoupon: "쿠폰이 있으신가요?",
            coupon: "쿠폰",
            choose: "선택",
            PlaceAnOrder: "주문하기",
            Selected: "선택됨",
            SelectPaymentCycle: "결제 주기 선택",
            month: "월 결제",
            quarter: "분기 결제",
            halfYear: "반기 결제",
            year: "연 결제",
            twoYear: "2년 결제",
            threeYear: "3년 결제",
            onetime: "1회성",
            trafficReset: "트래픽 리셋 패키지",
            validating: "검증 중",
            apply: "적용",
            couponUsed: "쿠폰 사용됨",
            Purchasing: "구매 중",
            PaymentMethods: "결제 방법",
            DeductAccountBalanceByDefault: "기본적으로 계정 잔액 차감",
            Confirmationofpayment: "결제 확인",
            AccountBalance: "계정 잔액",
            AmountToBePaid: "결제 금액",
            paid: "결제 완료",
            ContinueToPay: "결제 계속",
            CancelPayment: "결제 취소",
            handlingFee: "수수료",
            OnlineCustomer: "온라인 고객센터",
            CanceledUseOfCoupon: "쿠폰 사용 취소됨",
            Cancelled: "취소됨",
            planPurchaseSuccessful: "플랜 구매 성공",
            NoPayment: "결제되지 않은 주문",
            Select_your_preferred_display_theme: "선호하는 표시 테마를 선택하세요",
            Package_traffic: "플랜 트래픽",
            my_order: "내 주문",
            activation: "활성화",
            Expired: "만료됨",
            After_turning_it_on_all_network_requests_will_go_through_VPN: "켜면 모든 네트워크 요청이 VPN을 통해 전송됩니다",
            No_package_suitable_for_you: "적합한 플랜이 없습니다",
            Customized_services: "맞춤 서비스",
            Contact_customer_service: "고객센터 문의",
            Order_record: "주문 기록",
            Search_orders: "주문 검색...",
            Order_number: "주문 번호",
            Package: "플랜",
            Period: "주기",
            Date: "날짜",
            Amount: "금액",
            Status: "상태",
            No_data_found: "데이터가 없습니다",
            To_be_paid: "결제 대기",
            Data_Overview: "데이터 개요",
            My_Invitation: "내 초대",
            Commission_Record: "커미션 기록",
            piece: "건",
            language_theme: "언어｜테마",
            Send_us_message: "문의하기",
            Support_team_ready_to_help: "지원팀이 도움을 드릴 준비가 되어 있습니다",
            Language_Settings: "언어 설정",
            Select_your_preferred_language: "선호하는 언어를 선택하세요",
            Order_information: "주문 정보",
            Current_version: "현재 버전",
            Update_content: "업데이트 내용",
            Registered_user: "등록된 사용자",
            Commission_ratio: "커미션 비율",
            Commission_confirmed: "확인된 커미션",
            Cumulative_commission_earned: "누적 커미션",
            Generating: "생성 중",
            Generate_invitation_code: "초대 코드 생성",
            Invitation_link: "초대 링크",
            Finish: "완료",
            new_invitation_code_has_been_generated: "새 초대 코드가 생성되었습니다",
            invitation_code_was_entered_incorrectly: "초대 코드가 잘못 입력되었습니다",
            No_line_available: "사용 가능한 라인이 없습니다",
            Logout_successful: "로그아웃 성공",
            Login_successful: "로그인 성공",
            Proxy_configuration: "프록시 설정",
            Port_TunMode: "포트｜TUN 모드",
            Network_proxy_settings: "네트워크 프록시 설정",
            Network_proxy_type: "프록시 유형",
            Network_proxy_address: "프록시 주소",
            Turned_on: "켜짐",
            Turned_off: "비활성화됨",
            TUN_Mode: "TUN 모드",
            View: "보기",
            Current_Package: "현재 플랜",
            Connections: "연결",
            My: "내 정보",
            myTickets: "내 티켓",
            createTicket: "티켓 만들기",
            ticketManagement: "티켓 관리",
            pendingReply: "응답 대기",
            open: "열림",
            low: "낮음",
            medium: "중간",
            high: "높음",
            closeTicket: "티켓 닫기",
            details: "세부 정보",
            ticketClosed: "티켓이 닫혔습니다",
            replied: "응답 완료",
            ticketDetails: "티켓 세부 정보",
            me: "나",
            support: "고객 지원",
            enterReplyContent: "응답 내용을 입력하세요…",
            sending: "전송 중",
            createNewTicket: "새 티켓 생성",
            ticketTitle: "티켓 제목",
            priority: "우선순위",
            ticketContent: "티켓 내용",
            describeIssue: "문제를 설명하세요…",
            submitTicket: "티켓 제출",
            submitting: "제출 중",
            invalidReplyContent: "올바른 응답 내용을 입력하세요",
            invalidTransferAmount: "올바른 이체 금액을 입력하세요",
            invalidWithdrawalAccount: "올바른 출금 계좌를 입력하세요",
            invalidTicketTitle: "올바른 티켓 제목을 입력하세요",
            invalidTicketContent: "올바른 티켓 내용을 입력하세요",
            commission: "커미션",
            currentCommissionBalance: "현재 프로모션 커미션 잔액",
            lastUpdated: "마지막 업데이트",
            withdrawCommission: "커미션 출금",
            withdrawalAccount: "출금 계좌",
            enterWithdrawalAccount: "출금 계좌를 입력하세요",
            applyWithdrawal: "출금 신청",
            submittingApplication: "신청서 제출 중",
            balanceTransfer: "잔액 이체",
            transferToMainBalance: "프로모션 커미션 잔액을 메인 계정으로 이체",
            confirmTransfer: "이체 확인",
            submittingTransfer: "이체 제출 중",
            enterTransferAmount: "이체 금액 입력",
            Closing: "닫는 중",
            Please_enter_a_ticket_title: "티켓 제목을 입력하세요"
        }
    },
    jp: {
        lang: {
            lang: '日本語',
            email: 'メールアドレス',
            password: 'パスワード',
            confirmpassword: 'パスワード確認',
            forgotpassword: 'パスワードを忘れましたか?',
            login: 'ログイン',
            nohaveanaccount: 'アカウントをお持ちでないですか?',
            register: 'アカウント登録',
            loggingin: 'ログイン中',
            resetpassword: 'パスワードをリセット',
            emailverificationcode: 'メール認証コード',
            invitationcode: '招待コード',
            Invitationcodeoptional: '招待コード（任意）',
            send: '送信',
            requesting: '要求中',
            emailinputerror: 'メール入力エラー',
            couponinputerror: 'クーポン入力エラー',
            passwordinputerror: 'パスワード入力エラー',
            incorrectverificationcodeinput: '認証コードが正しくありません',
            passwordlengtherr: 'パスワードは8文字以上である必要があります',
            confirmationpassworddoesnotmatchthepassword: '確認用パスワードが一致しません',
            signup: 'アカウント登録',
            registering: '登録中',
            backtologin: 'ログインに戻る',
            Passwordresetsuccessful: 'パスワードのリセットに成功しました',
            disconnect: '未接続',
            connected: '接続済み',
            connecting: '接続中',
            disconnecting: '切断中',
            reconnecting: '再接続中',
            nodeselection: 'ノード選択',
            globalmode: 'グローバルモード',
            pacdesc: 'スマートモード: 海外地域をプロキシ',
            globaldesc: 'グローバルモード: 全ての地域をプロキシ',
            accountinformation: 'アカウント情報',
            onlinestore: 'オンラインストア',
            announcementcenter: 'お知らせセンター',
            helpcenter: 'ヘルプセンター',
            dataupdate: 'データ更新',
            updating: '更新中',
            aboutus: '会社概要',
            logout: 'ログアウト',
            storejumping: 'ストアへ移動中',
            home: 'ホーム',
            about: '概要',
            Announcementlist: 'お知らせ一覧',
            noannouncement: 'お知らせはありません',
            nohelpdocumentation: 'ヘルプドキュメントはありません',
            balance: '残高',
            plan: 'プラン',
            expiredate: '有効期限',
            Plantraffic: 'プランのデータ量',
            newversionfound: '新しいバージョンが見つかりました',
            updateversionnow: '今すぐ更新',
            confirmlogout: 'ログアウトを確認しますか?',
            confirm: '確認',
            cancel: 'キャンセル',
            startErr: '起動失敗、VPN権限を許可してください',
            timeout: 'タイムアウト',
            pingTps: '切断後に遅延機能を使用',
            tggroup: '公式グループ',
            website: '公式サイト',
            privacypolicy: 'プライバシーポリシー',
            tos: '利用規約',
            more: 'もっと見る',
            loading: '読み込み中',
            invitefriends: '友達を招待',
            trafficwillresetafterday: '{day}日後に流量がリセットされます',
            preferences: '設定',
            languages: '多言語',
            upLoad: 'アップロード',
            downLoad: 'ダウンロード',
            CopyExclusiveInvitationLink: '専用招待リンクをコピー',
            copysuccessfully: 'コピー成功',
            Clickthebuttontoconnect: 'ボタンをクリックして接続',
            Thecurrentaccountpackagehasexpired: '現在のプランは期限切れです',
            Gotostore: 'ストアへ行く',
            used: '使用済み',
            total: '合計',
            AutoSelect: '自動選択',
            AlreadypurchasedapackageRefreshdata: 'すでにプランを購入しましたか？ データを更新',
            Theme: 'テーマ設定',
            Not_configured_for_online_customer_service: 'オンラインカスタマーサービスが未設定です',
            Online_customer_service_is_loading: 'カスタマーサービス読み込み中',
            Package_traffic_has_been_exhausted: 'プランのデータ量を使い切りました',
            Haveacoupon: 'クーポンをお持ちですか?',
            coupon: 'クーポン',
            choose: '選択',
            PlaceAnOrder: '注文する',
            Selected: '選択済み',
            SelectPaymentCycle: '支払サイクルを選択',
            month: '月額',
            quarter: '四半期',
            halfYear: '半年',
            year: '年額',
            twoYear: '2年',
            threeYear: '3年',
            onetime: '一回限り',
            trafficReset: 'データリセットパック',
            validating: '検証中',
            apply: '適用',
            couponUsed: 'クーポン使用済み',
            Purchasing: '購入中',
            PaymentMethods: '支払い方法',
            DeductAccountBalanceByDefault: 'デフォルトでアカウント残高を差し引く',
            Confirmationofpayment: '支払い確認',
            AccountBalance: 'アカウント残高',
            AmountToBePaid: '支払金額',
            paid: '支払い済み',
            ContinueToPay: '支払いを続ける',
            CancelPayment: '支払いをキャンセル',
            handlingFee: '手数料',
            OnlineCustomer: 'オンラインカスタマーサービス',
            CanceledUseOfCoupon: 'クーポン使用をキャンセルしました',
            Cancelled: 'キャンセル済み',
            planPurchaseSuccessful: 'プランの購入に成功しました',
            NoPayment: '未払いの注文',
            Select_your_preferred_display_theme: 'お好きな表示テーマを選択してください',
            Package_traffic: 'プランデータ量',
            my_order: '私の注文',
            activation: '有効化',
            Expired: '期限切れ',
            After_turning_it_on_all_network_requests_will_go_through_VPN: 'オンにすると全てのネットワークリクエストがVPNを通ります',
            No_package_suitable_for_you: 'あなたに合うプランがありませんか？',
            Customized_services: 'カスタマイズサービス',
            Contact_customer_service: 'カスタマーサービスに連絡',
            Order_record: '注文記録',
            Search_orders: '注文を検索...',
            Order_number: '注文番号',
            Package: 'プラン',
            Period: '期間',
            Date: '日付',
            Amount: '金額',
            Status: 'ステータス',
            No_data_found: 'データが見つかりません',
            To_be_paid: '未払い',
            Data_Overview: '概要',
            My_Invitation: '招待',
            Commission_Record: '記録',
            piece: '件',
            language_theme: '言語｜テーマ',
            Send_us_message: 'お問い合わせ',
            Support_team_ready_to_help: 'サポートチームがいつでもお手伝いします',
            Language_Settings: '言語設定',
            Select_your_preferred_language: '希望する言語を選択してください',
            Order_information: '注文情報',
            Current_version: '現在のバージョン',
            Update_content: '更新内容',
            Registered_user: '登録ユーザー',
            Commission_ratio: 'コミッション率',
            Commission_confirmed: '確認中のコミッション',
            Cumulative_commission_earned: '累計獲得コミッション',
            Generating: '生成中',
            Generate_invitation_code: '招待コードを生成',
            Invitation_link: '招待リンク',
            Finish: '完了',
            new_invitation_code_has_been_generated: '新しい招待コードが生成されました',
            invitation_code_was_entered_incorrectly: '招待コードの入力が正しくありません',
            No_line_available: '利用可能なラインがありません',
            Logout_successful: 'ログアウト成功',
            Login_successful: 'ログイン成功',
            Proxy_configuration: 'プロキシ設定',
            Port_TunMode: 'ポート｜TUNモード',
            Network_proxy_settings: 'ネットワークプロキシ設定',
            Network_proxy_type: 'プロキシタイプ',
            Network_proxy_address: 'プロキシアドレス',
            Turned_on: 'オン',
            TUN_Mode: 'TUNモード',
            View: '表示',
            Current_Package: '現在のプラン',
            Connections: '接続',
            My: 'マイページ',
            myTickets: '私のチケット',
            createTicket: '新規チケット作成',
            ticketManagement: 'チケット管理',
            pendingReply: '返信待ち',
            open: 'オープン',
            low: '低',
            medium: '中',
            high: '高',
            closeTicket: 'チケットを閉じる',
            details: '詳細',
            ticketClosed: 'チケットが閉じられました',
            replied: '返信済み',
            ticketDetails: 'チケット詳細',
            me: '自分',
            support: 'サポート',
            enterReplyContent: '返信内容を入力…',
            sending: '送信中',
            createNewTicket: '新しいチケットを作成',
            ticketTitle: 'チケットタイトル',
            priority: '優先度',
            ticketContent: 'チケット内容',
            describeIssue: '問題を記述してください…',
            submitTicket: 'チケットを送信',
            submitting: '送信中',
            invalidReplyContent: '正しい返信内容を入力してください',
            invalidTransferAmount: '正しい振替金額を入力してください',
            invalidWithdrawalAccount: '正しい出金口座を入力してください',
            invalidTicketTitle: '正しいチケットタイトルを入力してください',
            invalidTicketContent: '正しいチケット内容を入力してください',
            commission: 'コミッション',
            currentCommissionBalance: '現在のプロモーション報酬残高',
            lastUpdated: '最終更新',
            withdrawCommission: 'コミッションを出金',
            withdrawalAccount: '出金口座',
            enterWithdrawalAccount: '出金口座を入力してください',
            applyWithdrawal: '出金を申請',
            submittingApplication: '申請中',
            balanceTransfer: '残高振替',
            transferToMainBalance: 'プロモーション報酬残高をメイン残高へ振替',
            confirmTransfer: '振替を確認',
            submittingTransfer: '振替を送信中',
            enterTransferAmount: '振替金額を入力',
            Closing: '閉じる中',
            Please_enter_a_ticket_title: 'チケットタイトルを入力してください'
        }
    },
    hk: {
        lang: {
            lang: '繁體中文',
            email: '郵箱',
            password: '密碼',
            confirmpassword: '確認密碼',
            forgotpassword: '忘記密碼?',
            login: '登錄',
            nohaveanaccount: "沒有帳號?",
            register: '註冊帳號',
            loggingin: '正在登入',
            resetpassword: '重置密碼',
            emailverificationcode: '郵箱驗證碼',
            invitationcode: '邀請碼',
            Invitationcodeoptional: '邀請碼(選填)',
            send: '發送',
            requesting: 'Requesting',
            emailinputerror: '郵箱輸入錯誤',
            couponinputerror: '優惠券輸入錯誤',
            passwordinputerror: '密碼輸入錯誤',
            incorrectverificationcodeinput: '驗證碼輸入錯誤',
            passwordlengtherr: '密碼長度需大於7位數',
            confirmationpassworddoesnotmatchthepassword: '確認密碼與密碼不符',
            signup: '註冊帳號',
            registering: "正在註冊",
            backtologin: "返回登入",
            Passwordresetsuccessful: "密码重置成功",
            disconnect: "未連接",
            connected: "已連接",
            connecting: "連接中",
            disconnecting: "斷開中",
            reconnecting: "重連中",
            nodeselection: "節點選擇",
            globalmode: "全局模式",
            pacdesc: "智能模式:代理海外地區",
            globaldesc: "全局模式:代理所有地區",
            accountinformation: "帳號",
            onlinestore: "在線商店",
            announcementcenter: "公告中心",
            helpcenter: "幫助中心",
            dataupdate: "數據更新",
            updating: "更新中",
            aboutus: "關於我們",
            logout: "登出",
            storejumping: "商店跳轉中",
            home: "首頁",
            about: "關於",
            Announcementlist: "公告列表",
            noannouncement: "沒有公告內容",
            nohelpdocumentation: "沒有幫助文檔",
            balance: "餘額",
            plan: "套餐",
            expiredate: "到期時間",
            Plantraffic: "套餐流量",
            newversionfound: "發現新版本",
            updateversionnow: "立即更新版本",
            confirmlogout: "確認登出帳號?",
            confirm: "確認",
            cancel: "取消",
            startErr: "啟動失敗,請授予VPN權限",
            timeout: "超時",
            pingTps: "断开连接后使用延迟功能",
            tggroup: "官方群組",
            website: "官網",
            privacypolicy: "隱私策略",
            tos: "服務條款",
            more: "更多",
            loading: "加載中",
            invitefriends: "邀請好友",
            trafficwillresetafterday: "流量將在{day}天後重置",
            preferences: "偏好設定",
            languages: "多語言",
            upLoad: "上傳",
            downLoad: "下載",
            CopyExclusiveInvitationLink: "複製專屬邀請鏈接",
            copysuccessfully: "複製成功",
            Clickthebuttontoconnect: "點擊按鈕進行連接",
            Thecurrentaccountpackagehasexpired: "當前帳號套餐包已到期",
            Gotostore: "前往商店",
            used: "已用",
            total: "總計",
            AutoSelect: "自動選擇",
            AlreadypurchasedapackageRefreshdata: "已購買套餐？ 刷新數據",
            Theme: "主題設定",
            Not_configured_for_online_customer_service: "未配置在線客服",
            Online_customer_service_is_loading: "在線客服加載中",
            Package_traffic_has_been_exhausted: "套餐包流量已用盡",
            Haveacoupon: "擁有優惠券?",
            coupon: "優惠券",
            choose: "選擇",
            PlaceAnOrder: "下單",
            Selected: "已選擇",
            SelectPaymentCycle: "選擇付費週期",
            month: "月付",
            quarter: "季付",
            halfYear: "半年付",
            year: "年付",
            twoYear: "兩年付",
            threeYear: "三年付",
            onetime: "一次性",
            trafficReset: "流量重置包",
            validating: "驗證中",
            apply: "應用",
            couponUsed: "已使用優惠券",
            Purchasing: "購買中",
            PaymentMethods: "支付方式",
            DeductAccountBalanceByDefault: "默認抵扣賬號餘額",
            Confirmationofpayment: "付款",
            AccountBalance: "賬號餘額",
            AmountToBePaid: "待支付金額",
            paid: "已支付",
            ContinueToPay: "繼續支付",
            CancelPayment: "取消支付",
            handlingFee: "手續費",
            OnlineCustomer: "在線客服",
            CanceledUseOfCoupon: "已取消使用優惠券",
            Cancelled: "已取消",
            planPurchaseSuccessful: "套餐購買成功",
            NoPayment: "未支付訂單",
            Select_your_preferred_display_theme: "選擇您喜歡的顯示主題", //2.1.3+
            Package_traffic: "套餐包流量",
            my_order: "我的訂單",
            activation: "啟用",
            Expired: "已到期",
            After_turning_it_on_all_network_requests_will_go_through_VPN: "開啟後所有網絡請求都將通過VPN",
            No_package_suitable_for_you: "沒有適合你的套餐？",
            Customized_services: "客製化服務",
            Contact_customer_service: "聯繫客服",
            Order_record: "訂單記錄",
            Search_orders: "搜尋訂單...",
            Order_number: "訂單號",
            Package: "套餐",
            Period: "週期",
            Date: "日期",
            Amount: "金額",
            Status: "狀態",
            No_data_found: "沒有找到數據",
            To_be_paid: "待支付",
            Data_Overview: "概覽",
            My_Invitation: "邀請",
            Commission_Record: "記錄",
            piece: "條",
            language_theme: "語言｜主題",
            Send_us_message: "聯絡我們",
            Support_team_ready_to_help: "支持團隊隨時提供幫助",
            Language_Settings: "語言設置",
            Select_your_preferred_language: "選擇您的首選語言",
            Order_information: "訂單信息",
            Current_version: "當前版本",
            Update_content: "更新內容",
            Registered_user: "已註冊用戶",
            Commission_ratio: "傭金比例",
            Commission_confirmed: "確認中傭金",
            Cumulative_commission_earned: "累計獲得傭金",
            Generating: "正在生成",
            Generate_invitation_code: "生成邀請碼",
            Invitation_link: "邀請連結",
            Finish: "完成",
            new_invitation_code_has_been_generated: "新的邀請碼已生成",
            invitation_code_was_entered_incorrectly: "邀請碼輸入不正確",
            No_line_available: "沒有線路可使用",
            Logout_successful: "登出成功",
            Login_successful: "登入成功",
            Proxy_configuration: "代理配置",
            Port_TunMode: "端口｜TUN模式",
            Network_proxy_settings: "網絡代理設置",
            Network_proxy_type: "代理類型",
            Network_proxy_address: "代理地址",
            Turned_on: "已開啟",
            Turned_off: "未開啟",
            TUN_Mode: "網卡模式",
            View: "查閱",
            Current_Package: "當前套餐",
            Connections: "連接",
            My: "我的",

            myTickets: "我的工單",
            createTicket: "新建工單",
            ticketManagement: "工單管理",
            pendingReply: "待回覆",
            open: "開啟",
            low: "低",
            medium: "中",
            high: "高",
            closeTicket: "關閉工單",
            details: "詳情",
            ticketClosed: "工單已關閉",
            replied: "已回覆",
            ticketDetails: "工單詳情",
            me: "我",
            support: "客服",
            enterReplyContent: "輸入回覆內容…",
            sending: "發送中",
            createNewTicket: "創建新工單",
            ticketTitle: "工單標題",
            priority: "優先級",
            ticketContent: "工單內容",
            describeIssue: "描述你的問題…",
            submitTicket: "提交工單",
            submitting: "正在提交",
            invalidReplyContent: "請正確填寫回覆資訊",
            invalidTransferAmount: "請正確填寫劃轉金額",
            invalidWithdrawalAccount: "請正確填寫提現帳號",
            invalidTicketTitle: "請正確填寫工單標題",
            invalidTicketContent: "請正確填寫工單內容",
            commission: "佣金",
            currentCommissionBalance: "當前推廣佣金餘額",
            lastUpdated: "最後更新",
            withdrawCommission: "佣金提現",
            withdrawalAccount: "提現帳號",
            enterWithdrawalAccount: "請輸入提現帳號",
            applyWithdrawal: "申請提現",
            submittingApplication: "正在提交申請",
            balanceTransfer: "餘額劃轉",
            transferToMainBalance: "將推廣佣金餘額劃轉至主帳戶餘額",
            confirmTransfer: "確認劃轉",
            submittingTransfer: "正在提交劃轉",
            enterTransferAmount: "輸入劃轉金額",
            Closing: "關閉中",
            Please_enter_a_ticket_title: "請輸入工單標題"

        }
    },
    vn: {
        lang: {
            lang: 'Tiếng Việt',
            email: 'E-mail',
            password: 'Mật khẩu',
            confirmpassword: 'Xác nhận mật khẩu',
            forgotpassword: 'Quên mật khẩu?',
            login: 'Đăng nhập',
            nohaveanaccount: "Không có tài khoản?",
            register: 'Đăng ký',
            loggingin: 'Đăng nhập..',
            resetpassword: 'Đặt Lại Mật Khẩu',
            emailverificationcode: 'Mã xác minh mail',
            invitationcode: 'Mã mời',
            Invitationcodeoptional: 'Mã mời (tùy chọn)',
            send: 'Gửi',
            requesting: 'yêu cầu..',
            emailinputerror: 'Lỗi nhập email',
            couponinputerror: 'Lỗi nhập phiếu giảm giá',
            passwordinputerror: 'mật khẩu không đúng',
            incorrectverificationcodeinput: 'Mã xác minh không chính xác',
            passwordlengtherr: 'Mật khẩu phải lớn hơn 8 chữ số',
            confirmationpassworddoesnotmatchthepassword: 'Xác nhận mật khẩu không khớp với mật khẩu',
            signup: 'Đăng ký tài khoản',
            registering: "đăng ký..",
            backtologin: "Quay lại đăng nhập",
            Passwordresetsuccessful: "Đặt lại mật khẩu thành công",
            disconnect: "Ngắt kết nối",
            connected: "Kết nối",
            connecting: "Đang kết nối",
            disconnecting: "ngắt kết nối",
            reconnecting: "Đang kết nối lại",
            nodeselection: "Chọn máy chủ",
            globalmode: "Chế độ toàn cầu",
            accountinformation: "Thông tin tài khoản",
            onlinestore: "Mua gói",
            announcementcenter: "Thông báo",
            helpcenter: "Hướng dẫn",
            dataupdate: "Cập nhật",
            updating: "đang cập nhật",
            aboutus: "Giới thiệu",
            logout: "Đăng xuất",
            storejumping: "Chuyển đến mua gói",
            home: "Trang đầu",
            about: "Về",
            Announcementlist: "Danh sách thông báo",
            noannouncement: "Không có nội dung thông báo",
            nohelpdocumentation: "Không có tài liệu trợ giúp",
            balance: "Số dư",
            plan: "Gói dịch vụ",
            expiredate: "Hạn sử dụng",
            Plantraffic: "Lưu lượng",
            newversionfound: "phiên bản mới được phát hiện",
            updateversionnow: "Cập nhật phiên bản ngay bây giờ",
            confirmlogout: "Xác nhận đăng xuất?",
            confirm: "xác nhận",
            cancel: "Hủy bỏ",
            startErr: "Không thể bắt đầu, vui lòng cấp quyền cho VPN",
            timeout: "Lỗi",
            pingTps: "Sử dụng chức năng trì hoãn sau khi ngắt kết nối",
            tggroup: "Nhóm chính thức",
            website: "Trang web chính thức",
            privacypolicy: "Chính sách bảo mật",
            tos: "Điều khoản dịch vụ",
            more: "Hơn",
            loading: "Đang tải",
            invitefriends: "mời bạn bè",
            trafficwillresetafterday: "Lưu lượng truy cập sẽ được đặt lại sau {day} ngày",
            preferences: "Sở thích",
            languages: "ngôn ngữ",
            upLoad: "tải lên",
            downLoad: "Tải xuống",
            CopyExclusiveInvitationLink: "Sao chép liên kết lời mời độc quyền",
            copysuccessfully: "sao chép thành công",
            Clickthebuttontoconnect: "Nhấn vào nút để kết nối",
            Thecurrentaccountpackagehasexpired: "The current account plan has expired",
            Gotostore: "Go to store",
            used: "đã sử dụng",
            total: "tổng cộng",
            AutoSelect: "Tự động lựa chọn",
            AlreadypurchasedapackageRefreshdata: "Gói đã mua Làm mới dữ liệu",
            Theme: "Cài đặt chủ đề",
            Not_configured_for_online_customer_service: "Dịch vụ Khách hàng chưa khả dụng",
            Online_customer_service_is_loading: "Dịch vụ khách hàng đang tải",
            Package_traffic_has_been_exhausted: "Lưu lượng đã hết",
            Haveacoupon: "Có phiếu giảm giá?",
            coupon: "Phiếu giảm giá",
            choose: "Chọn",
            PlaceAnOrder: "Đặt hàng",
            Selected: "Đã chọn",
            SelectPaymentCycle: "Chọn chu kỳ thanh toán",
            month: "Thanh toán hàng tháng",
            quarter: "Thanh toán hàng quý",
            halfYear: "Thanh toán nửa năm",
            year: "Thanh toán hàng năm",
            twoYear: "Thanh toán hai năm",
            threeYear: "Thanh toán ba năm",
            onetime: "Thanh toán một lần",
            trafficReset: "Gói đặt lại lưu lượng",
            validating: "Đang xác thực",
            apply: "Áp dụng",
            couponUsed: "Đã sử dụng phiếu giảm giá",
            Purchasing: "Đang mua hàng",
            PaymentMethods: "Phương thức thanh toán",
            DeductAccountBalanceByDefault: "Mặc định trừ vào số dư tài khoản",
            Confirmationofpayment: "Thanh toán",
            AccountBalance: "Số dư tài khoản",
            AmountToBePaid: "Số tiền cần thanh toán",
            paid: "Đã thanh toán",
            ContinueToPay: "Tiếp tục thanh toán",
            CancelPayment: "Hủy thanh toán",
            handlingFee: "Phí xử lý",
            OnlineCustomer: "Dịch vụ khách hàng trực tuyến",
            CanceledUseOfCoupon: "Đã hủy sử dụng phiếu giảm giá",
            Cancelled: "Đã hủy",
            planPurchaseSuccessful: "Mua gói thành công",
            NoPayment: "Chưa thanh toán đơn hàng",
            Select_your_preferred_display_theme: "Chọn giao diện hiển thị ưa thích của bạn",
            Package_traffic: "Dữ liệu gói cước",
            my_order: "Đơn hàng của tôi",
            activation: "Kích hoạt",
            Expired: "Đã hết hạn",
            After_turning_it_on_all_network_requests_will_go_through_VPN: "Sau khi bật, tất cả các yêu cầu mạng sẽ đi qua VPN",
            No_package_suitable_for_you: "Không có gói nào phù hợp với bạn?",
            Customized_services: "Dịch vụ tùy chỉnh",
            Contact_customer_service: "Liên hệ với chăm sóc khách hàng",
            Order_record: "Lịch sử đơn hàng",
            Search_orders: "Tìm kiếm đơn hàng...",
            Order_number: "Mã đơn hàng",
            Package: "Gói cước",
            Period: "Thời hạn",
            Date: "Ngày",
            Amount: "Số tiền",
            Status: "Trạng thái",
            No_data_found: "Không tìm thấy dữ liệu",
            To_be_paid: "Chưa thanh toán",
            Data_Overview: "Tổng quan dữ liệu",
            My_Invitation: "Lời mời của tôi",
            Commission_Record: "Lịch sử hoa hồng",
            piece: 'mục hoặc phần (tùy ngữ cảnh)',
            language_theme: "Ngôn ngữ | Giao diện",
            Send_us_message: "Gửi tin nhắn cho chúng tôi",
            Support_team_ready_to_help: "Đội ngũ hỗ trợ sẵn sàng giúp đỡ bạn",
            Language_Settings: "Cài đặt ngôn ngữ",
            Select_your_preferred_language: "Chọn ngôn ngữ ưa thích của bạn",
            Order_information: "Thông tin đơn hàng",
            Current_version: "Phiên bản hiện tại",
            Update_content: "Nội dung cập nhật",
            Registered_user: "Người dùng đã đăng ký",
            Commission_ratio: "Tỷ lệ hoa hồng",
            Commission_confirmed: "Hoa hồng đang xác nhận",
            Cumulative_commission_earned: "Tổng hoa hồng đã nhận",
            Generating: "Đang tạo",
            Generate_invitation_code: "Tạo mã mời",
            Invitation_link: "Liên kết mời",
            Finish: "Hoàn thành",
            new_invitation_code_has_been_generated: "Mã mời mới đã được tạo",
            invitation_code_was_entered_incorrectly: "Mã mời được nhập không chính xác",
            No_line_available: "Không có đường dây khả dụng",
            Logout_successful: "Đăng xuất thành công",
            Login_successful: "Đăng nhập thành công",
            Proxy_configuration: "Cấu hình proxy",
            Port_TunMode: "Cổng｜Chế độ TUN",
            Network_proxy_settings: "Cài đặt proxy mạng",
            Network_proxy_type: "Loại proxy",
            Network_proxy_address: "Địa chỉ proxy",
            Turned_on: "Đã bật",
            Turned_off: "Chưa bật",
            TUN_Mode: "Chế độ TUN",
            View: "Xem",
            Current_Package: "Gói hiện tại",
            Connections: "Kết nối",
            My: "Của tôi",

            myTickets: "Phiếu hỗ trợ của tôi",
            createTicket: "Tạo phiếu hỗ trợ",
            ticketManagement: "Quản lý phiếu hỗ trợ",
            pendingReply: "Chờ phản hồi",
            open: "Mở",
            low: "Thấp",
            medium: "Trung bình",
            high: "Cao",
            closeTicket: "Đóng phiếu",
            details: "Chi tiết",
            ticketClosed: "Phiếu đã đóng",
            replied: "Đã phản hồi",
            ticketDetails: "Chi tiết phiếu hỗ trợ",
            me: "Tôi",
            support: "Hỗ trợ",
            enterReplyContent: "Nhập nội dung phản hồi...",
            sending: "Đang gửi...",
            createNewTicket: "Tạo phiếu hỗ trợ mới",
            ticketTitle: "Tiêu đề phiếu",
            priority: "Mức độ ưu tiên",
            ticketContent: "Nội dung phiếu",
            describeIssue: "Mô tả vấn đề của bạn...",
            submitTicket: "Gửi phiếu hỗ trợ",
            submitting: "Đang gửi...",
            invalidReplyContent: "Vui lòng nhập nội dung phản hồi hợp lệ",
            invalidTransferAmount: "Vui lòng nhập số tiền chuyển hợp lệ",
            invalidWithdrawalAccount: "Vui lòng nhập tài khoản rút tiền hợp lệ",
            invalidTicketTitle: "Vui lòng nhập tiêu đề phiếu hợp lệ",
            invalidTicketContent: "Vui lòng nhập nội dung phiếu hợp lệ",
            commission: "Hoa hồng",
            currentCommissionBalance: "Số dư hoa hồng khuyến mãi hiện tại",
            lastUpdated: "Cập nhật lần cuối",
            withdrawCommission: "Rút hoa hồng",
            withdrawalAccount: "Tài khoản rút tiền",
            enterWithdrawalAccount: "Vui lòng nhập tài khoản rút tiền",
            applyWithdrawal: "Yêu cầu rút tiền",
            submittingApplication: "Đang gửi yêu cầu...",
            balanceTransfer: "Chuyển số dư",
            transferToMainBalance: "Chuyển hoa hồng sang số dư tài khoản chính",
            confirmTransfer: "Xác nhận chuyển",
            submittingTransfer: "Đang gửi chuyển khoản...",
            enterTransferAmount: "Nhập số tiền chuyển",
            Closing: "Đang đóng",
            Please_enter_a_ticket_title: "Vui lòng nhập tiêu đề phiếu"

        }
    },
    fa: {
        lang: {
            lang: 'فارسی',
            email: 'ایمیل',
            password: 'کلمه عبور',
            confirmpassword: 'تایید کلمه عبور',
            forgotpassword: 'کلمه عبور را فراموش کرده اید؟',
            login: 'ورود',
            nohaveanaccount: "ثبت نام حساب کاربری؟",
            register: 'ثبت نام',
            loggingin: 'ورود',
            resetpassword: 'بازیابی کلمه عبور',
            emailverificationcode: 'کد تایید ایمیل',
            invitationcode: 'کد دعوت',
            Invitationcodeoptional: 'کد دعوت (اختیاری)',
            send: 'ارسال',
            requesting: 'در حال ارسال درخواست',
            emailinputerror: 'ایمیل نادرست است',
            couponinputerror: 'هنگام وارد کردن کوپن خطایی روی داد',
            passwordinputerror: 'کلمه عبور نادرست است',
            incorrectverificationcodeinput: 'کد تایید نادرست است',
            passwordlengtherr: 'کلمه عبور حداقل 8 کاراکتر باشد',
            confirmationpassworddoesnotmatchthepassword: 'تایید کلمه عبور یکسان نیست',
            signup: 'ثبت نام',
            registering: "در حال ثبت نام",
            backtologin: "بازگشت به صفحه ورود",
            Passwordresetsuccessful: "کلمه عبور با موفقیت بازیابی شد",
            disconnect: "قطع اتصال",
            connected: "متصل",
            connecting: "در حال اتصال",
            disconnecting: "در حال قطع اتصال",
            reconnecting: "در حال اتصال مجدد",
            nodeselection: "انتخاب گره اتصال",
            globalmode: "حالت جهانی",
            pacdesc: "حالت هوشمند: اقدام برای مناطق خارج از کشور",
            globaldesc: "حالت جهانی: پروکسی همه مناطق",
            accountinformation: "حساب کاربری",
            onlinestore: "فروشگاه آنلاین",
            announcementcenter: "مرکز اطلاع رسانی",
            helpcenter: "مرکز آموزش",
            dataupdate: "بروزرسانی",
            updating: "در حال بروزرسانی",
            aboutus: "درباره ما",
            logout: "خروج",
            storejumping: "ورود به فروشگاه",
            home: "خانه",
            about: "درباره",
            Announcementlist: "لیست اعلامیه",
            noannouncement: "اعلان موجود نیست",
            nohelpdocumentation: "آموزش موجود نیست",
            balance: "موجودی",
            plan: "بسته اشتراک",
            expiredate: "تاریخ انقضا",
            Plantraffic: "ترافیک بسته",
            newversionfound: "نسخه جدید یافت شد",
            updateversionnow: "بروزرسانی نسخه جدید",
            confirmlogout: "خارج شود؟",
            confirm: "تایید",
            cancel: "لغو",
            startErr: "خطا در اتصال، دسترسی های لازم را بدهید",
            timeout: "Time Out",
            pingTps: "برای تست ابتدا اتصال را قطع کنید",
            tggroup: "ربات تلگرام",
            website: "وب سایت رسمی",
            privacypolicy: "سیاست حفظ حریم خصوصی",
            tos: "شرایط استفاده از خدمات",
            more: "بیشتر",
            loading: "در حال بارگذاری",
            invitefriends: "دعوت از دوستان",
            trafficwillresetafterday: "{day} روز مانده تا بازنشانی ترافیک",
            preferences: "تنظیمات",
            languages: "زبان",
            upLoad: "آپلود",
            downLoad: "دانلود",
            CopyExclusiveInvitationLink: "لینک دعوت خود را کپی کنید",
            copysuccessfully: "با موفقیت کپی شد",
            Clickthebuttontoconnect: "برای اتصال دکمه را لمس کنید",
            Thecurrentaccountpackagehasexpired: "بسته اشتراک منقضی شده است",
            Gotostore: "به فروشگاه بروید",
            AlreadypurchasedapackageRefreshdata: "قبلا یک بسته خریداری کرده اید؟ تازه کردن داده ها",
            used: "استفاده شده",
            total: "مجموع",
            AutoSelect: "انتخاب خودکار",
            Theme: "تنظیمات قالب",
            Not_configured_for_online_customer_service: "برای سرویس مشتریان آنلاین پیکربندی نشده است",
            Online_customer_service_is_loading: "سرویس مشتریان آنلاین در حال بارگذاری است",
            Package_traffic_has_been_exhausted: "بسته ترافیک به اتمام رسیده است",
            Haveacoupon: "کوپن دارید؟",
            coupon: "کوپن",
            choose: "انتخاب کنید",
            PlaceAnOrder: "سفارش دهید",
            Selected: "انتخاب شده",
            SelectPaymentCycle: "دوره پرداخت را انتخاب کنید",
            month: "ماهانه",
            quarter: "سه‌ماهه",
            halfYear: "شش‌ماهه",
            year: "سالانه",
            twoYear: "دو ساله",
            threeYear: "سه ساله",
            onetime: "یک بار",
            trafficReset: "بسته بازنشانی ترافیک",
            validating: "در حال اعتبارسنجی",
            apply: "اعمال کنید",
            couponUsed: "کوپن استفاده شده",
            Purchasing: "در حال خرید",
            PaymentMethods: "روش‌های پرداخت",
            DeductAccountBalanceByDefault: "کسر موجودی حساب به صورت پیش فرض",
            Confirmationofpayment: "پرداخت",
            AccountBalance: "موجودی حساب",
            AmountToBePaid: "مبلغ قابل پرداخت",
            paid: "پرداخت شده",
            ContinueToPay: "ادامه پرداخت",
            CancelPayment: "لغو پرداخت",
            handlingFee: "هزینه دستمزد",
            OnlineCustomer: "پشتیبانی آنلاین",
            CanceledUseOfCoupon: "استفاده از کوپن لغو شد",
            Cancelled: "لغو شد",
            planPurchaseSuccessful: "خرید بسته با موفقیت انجام شد",
            NoPayment: "سفارش پرداخت نشده",
            Select_your_preferred_display_theme: "زمینه نمایش دلخواه خود را انتخاب کنید", //2.1.3+
            Package_traffic: "اطلاعات بسته",
            my_order: "سفارشات من",
            activation: "فعال",
            Expired: "منقضی شده",
            After_turning_it_on_all_network_requests_will_go_through_VPN: "پس از روشن کردن، تمام درخواست های شبکه از طریق VPN انجام می شود",
            No_package_suitable_for_you: "هیچ بسته ای برای شما مناسب نیست؟",
            Customized_services: "خدمات سفارشی",
            Contact_customer_service: "تماس با خدمات مشتریان",
            Order_record: "سوابق سفارش",
            Search_orders: "جستجو سفارشات...",
            Order_number: "شماره سفارش",
            Package: "بسته",
            Period: "دوره",
            Date: "تاریخ",
            Amount: "مقدار",
            Status: "وضعیت",
            No_data_found: "اطلاعاتی پیدا نشد",
            To_be_paid: "پرداخت شود",
            Data_Overview: "بررسی داده ها",
            My_Invitation: "دعوتنامه من",
            Commission_Record: "سوابق کمیسیون",
            piece: "قطعه",
            language_theme: "زبان | زمینه",
            Send_us_message: "برای ما پیام ارسال کنید",
            Support_team_ready_to_help: "تیم پشتیبانی آماده کمک است",
            Language_Settings: "تنظیمات زبان",
            Select_your_preferred_language: "زبان مورد نظر خود را انتخاب کنید",
            Order_information: "اطلاعات سفارش",
            Current_version: "نسخه فعلی",
            Update_content: "محتوای به‌روزرسانی",
            Registered_user: "کاربر ثبت‌شده",
            Commission_ratio: "نسبت کمیسیون",
            Commission_confirmed: "کمیسیون در حال تایید",
            Cumulative_commission_earned: "کمیسیون کسب‌شده کل",
            Generating: "در حال ایجاد",
            Generate_invitation_code: "تولید کد دعوت",
            Invitation_link: "لینک دعوت",
            Finish: "تمام",
            new_invitation_code_has_been_generated: "کد دعوت ایجاد شده است",
            invitation_code_was_entered_incorrectly: "کد دعوت به‌طور نادرست وارد شده است",
            No_line_available: "هیچ خطی در دسترس نیست",
            Logout_successful: "خروج موفقیت‌آمیز",
            Login_successful: "ورود موفقیت‌آمیز",
            Proxy_configuration: "پیکربندی پروکسی",
            Port_TunMode: "پورت｜حالت TUN",
            Network_proxy_settings: "تنظیمات پروکسی شبکه",
            Network_proxy_type: "نوع پروکسی",
            Network_proxy_address: "آدرس پروکسی",
            Turned_on: "روشن شده",
            Turned_off: "غیرفعال",
            TUN_Mode: "حالت TUN",
            View: "مشاهده",
            Current_Package: "بسته فعلی",
            Connections: "اتصالات",
            My: "من",
            myTickets: "تیکت‌های من",
            createTicket: "ایجاد تیکت",
            ticketManagement: "مدیریت تیکت",
            pendingReply: "در انتظار پاسخ",
            open: "باز",
            low: "کم",
            medium: "متوسط",
            high: "زیاد",
            closeTicket: "بستن تیکت",
            details: "جزئیات",
            ticketClosed: "تیکت بسته شده است",
            replied: "پاسخ داده شد",
            ticketDetails: "جزئیات تیکت",
            me: "من",
            support: "پشتیبانی",
            enterReplyContent: "محتوای پاسخ را وارد کنید...",
            sending: "در حال ارسال...",
            createNewTicket: "ایجاد تیکت جدید",
            ticketTitle: "عنوان تیکت",
            priority: "اولویت",
            ticketContent: "محتوای تیکت",
            describeIssue: "مشکل خود را توصیف کنید...",
            submitTicket: "ارسال تیکت",
            submitting: "در حال ارسال...",
            invalidReplyContent: "لطفاً محتوای پاسخ معتبر وارد کنید",
            invalidTransferAmount: "لطفاً مبلغ انتقال معتبر وارد کنید",
            invalidWithdrawalAccount: "لطفاً حساب برداشت معتبر وارد کنید",
            invalidTicketTitle: "لطفاً عنوان تیکت معتبر وارد کنید",
            invalidTicketContent: "لطفاً محتوای تیکت معتبر وارد کنید",
            commission: "کمیسیون",
            currentCommissionBalance: "موجودی فعلی کمیسیون تبلیغاتی",
            lastUpdated: "آخرین بروزرسانی",
            withdrawCommission: "برداشت کمیسیون",
            withdrawalAccount: "حساب برداشت",
            enterWithdrawalAccount: "لطفاً حساب برداشت را وارد کنید",
            applyWithdrawal: "درخواست برداشت",
            submittingApplication: "در حال ارسال درخواست...",
            balanceTransfer: "انتقال موجودی",
            transferToMainBalance: "انتقال موجودی کمیسیون به حساب اصلی",
            confirmTransfer: "تأیید انتقال",
            submittingTransfer: "در حال ارسال انتقال...",
            enterTransferAmount: "مبلغ انتقال را وارد کنید",
            Closing: "در حال بستن",
            Please_enter_a_ticket_title: "لطفاً عنوان تیکت را وارد کنید"
        }
    }
}

var Main = {
    data() {
        return {
            panelType: "v2board",
            appVersion: "2.2.0",
            nodes: [],
            nodeInfos: [],
            mode: 0,
            startTime: "00:00:00",
            isStore: false,
            isWebStore: false,
            isCrisp: false,
            timer: "",
            hour: null,
            minute: null,
            second: null,
            news: [],
            emailList: [
                "gmail.com",
                "qq.com",
                "outlook.com",
                "163.com",
                "126.com",
                "yeah.net",
                "foxmail.com",
                "sina.com",
                "icloud.com"
            ],
            isShowSuccess: false,
            isShowForgetSuccess: false,
            isShowSuccessText: "账户注册完成",
            isShowForget: false,
            url: "",
            weburl: "",
            urls: "",
            tabIndex: 'home',
            isNeedInvite: false,
            isEmailVerify: false,
            isShowPass: false,
            isShownewExit: false,
            isShowprofileList: "",
            isShowStore: "",
            isUpdateData: false,
            isWebLogin: false,
            isShowAbout: false,
            isShownodeList: false,
            isShowTos: "",
            isShowNews: false,
            isShowknowledge: false,
            isShowAccountExp: false,
            isAccountExp: false,
            isShowAccountTrafficExhausted: false,
            isAccountExhausted: false,
            isShowPrivacy: "",
            passtype: "password",
            isCurreNode: 0,
            isAlert: false,
            isShowLoading: false,
            storeLink: "",
            isLoging: false,
            isLogin: false,
            isRegistering: false,
            isForget: false,
            showLogin: true,
            showSign: false,
            isShowLogin: false,
            isShowToast: false,
            isShowMenu: "",
            isShowMenuRight: "",
            ToastType: "success",
            globalMode: "testb",
            tunMode: "testb",
            ToastText: "",
            isStart: false,
            isStarting: false,
            statusText: "disconnect",
            lastConfigHash: "", // 上次配置的hash值，用于检测配置是否变化
            initConfRestartTimer: null, // initConf重启防抖定时器
            user: "",
            accountName: "",
            accountExpire: "",
            accountUserTf: "",
            accountTfPercentage: 0,
            accountID: "",
            accountPlan: "",
            accountMoney: "",
            accountdays: "",
            accountCode: "",
            accountBandwidth: "",
            appDescription: "",
            appName: "",
            appLogo: "",
            isLoading: false,
            isSend: false,
            show: true,
            count: 0,
            newTimer: "",
            forgetShow: true,
            forgetCount: 0,
            forgetTimer: "",
            isCurreNodeName: "无线路可使用",
            isCurreNodePing: 0,
            isCurreNodeFlags: "assets/flags/null.png",
            isClick: false,
            nodesIndex: "",
            _interval: null,
            _timeout: null,
            loginEmail: "",
            loginPasswd: "",
            signEmail: "",
            signCode: "",
            signInviteCode: "",
            signPasswd: "",
            signRepasswd: "",
            forgetEmail: "",
            forgetPasswd: "",
            forgetRePasswd: "",
            forgetCode: "",
            nodesAddr: [],
            nodesPing: [],
            guideList: [],
            noticeList: [],
            guideText: "加载中..",
            isShow: "",
            languages: [
                {
                    name: "English",
                    code: "en"
                },
                {
                    name: "中文",
                    code: "cn"
                },
                {
                    name: "繁體中文",
                    code: "hk"
                },

                {
                    name: "한국인",
                    code: "kr"
                },
                {
                    name: "日本語",
                    code: "jp"
                },

                {
                    name: "Tiếng Việt",
                    code: "vn"
                },
                {
                    name: "فارسی",
                    code: "fa"
                }
            ],
            isActiveLang: false,
            isActiveMore: false,
            language: "cn",
            isUpdate: false,
            updateLink: "",
            knowledgeText: "",
            pingIndex: 0,
            isPing: false,
            isShowPingToast: false,
            isTos: false,
            isTggroup: false,
            isPP: false,
            isWebsite: false,
            weblink: "",
            tggrouplink: "",
            pplink: "",
            toslink: "",
            accountCardHeight: 100,
            langsHeight: 60,
            showAccountInvite: false,
            isShowHome: false,
            isShowAccount: false,
            isShowMore: false,
            isFetchKnowledge: false,
            isFetchNotice: false,
            isShowPreferences: false,
            testMsg: "test msg",
            tfUp: "0.0B",
            tfDown: "0.0B",
            tfupTotal: 0,
            tfdownTotal: 0,
            wsServer: null,
            lastRefreshTime: localStorage.getItem("lastRefreshTime"),
            isCore: false,
            isCoreing: false,
            crispID: "",
            chatUrl: "",
            apptheme: "",
            themes: [
                {
                    name: "Default",
                    hex: "#0074FF"
                },
                {
                    name: "Rose",
                    hex: "#e11d48"
                },
                {
                    name: "Pink",
                    hex: "#db2777"
                },
                {
                    name: "Purple",
                    hex: "#9333ea"
                },
                {
                    name: "Indigo",
                    hex: "#4f46e5"
                },
                {
                    name: "Blue",
                    hex: "#2563eb"
                },
                {
                    name: "Cyan",
                    hex: "#0891b2"
                },
                {
                    name: "Emerald",
                    hex: "#059669"
                },
                {
                    name: "Green",
                    hex: "#16a34a"
                },
                {
                    name: "Orange",
                    hex: "#ea580c"
                },
                {
                    name: "Red",
                    hex: "#dc2626"
                },
                {
                    name: "Neutral",
                    hex: "#525252"
                },
                {
                    name: "Yellow",
                    hex: "#facc15"
                }
            ],
            chatType: "",
            chatID: "",
            chatLink: "",
            isShowChatContainer: false,
            isChatLoading: true,
            isShowCrispHideBtn: false,
            colorsHeight: 60,
            hostUrl: "",
            plans: [],
            payments: [],
            pname: "",
            selectedPlanCycle: "",
            selectedBalanceAmount: "",
            selectedPlantotalAmount: "",
            selectedPlantotalDiscountAmount: "",
            selectedPlantotalHandlingAmount: "",
            selectedPlanOrderNo: "",
            selectedPlanLink: "",
            selectedPlanID: "",
            discountCode: "",
            isCoupon: false,
            isCouponValue: null,
            isCouponIng: false,
            orderCoupon: "",
            selectedPayID: "",
            selectedPlans: [],
            selectOderName: "",
            isFetchPlaning: false,
            isPay: false,
            isPayPopup: false,
            currency_symbol: "¥",
            isShowPlanInfo: false,
            currentPlan: null,
            isSupport: false,
            apihost: [
				"https://sgootusk.oss-ap-southeast-1.aliyuncs.com/linmkkc6/o01li/yoyoc0/host.json",
				"https://uouiusso.oss-cn-shanghai.aliyuncs.com/yoiliciiii1I/eiuwoo5/host.json",
				"https://koknui2o1li1.oss-ap-northeast-2.aliyuncs.com/vbnr087/wro0o/api/host.json",
				"https://scb23nrwsdf34.oss-cn-qingdao.aliyuncs.com/v1/api/dataaichange/host.json",
				"https://kf3nrwsdf34.oss-cn-qingdao.aliyuncs.com/v1/api/1aichange/host.json"
			],
            apiLists: [],
            currentPage: 1,//2.1.3
            pageSize: 5,//2.1.3
            isFetchOrdersing: false,//2.1.3
            searchTerm: '',//2.1.3
            orders: [],//2.1.3
            invite_code: "",//2.1.3
            invite_codes: "",//2.1.3
            inviteUrl: "",
            invite_commission_balance: 0,//2.1.3
            invite_commission_rate: 0,//2.1.3
            invite_get_amount: 0,//2.1.3
            invite_uncheck_commission_balance: 0,//2.1.3
            invite_users: 0,//2.1.3
            invitedetails: [],//2.1.3
            pageSizeOptions: [10, 20, 50],//2.1.3
            isOrderRecords: false,//2.1.3
            isGenerateing: false,//2.1.3
            isGenerateIngviteing: false,//2.1.3
            isFetchKnowing: false,//2.1.3
            isDarkorLight: "",//2.1.3
            updateMsg: "",//2.1.3
            updateContextArr: "",//2.1.3
            isAppAlert: false,//2.1.3
            isNetwork_proxy_settings: false,//2.1.3
            AppAlertMessage: "",//2.1.3
            AppAlertTitle: "",//2.1.3
            AppAlertImg: "",//2.1.3
            AppAlertTags: [],//2.1.3
            classesList: [
                'bg-blue-100 text-blue-800',
                'bg-green-100 text-green-800',
                'bg-purple-100 text-purple-800',
                'bg-yellow-100 text-yellow-800',
                'bg-pink-100 text-pink-800'
            ],//2.1.3
            tagClasses: [], //2.1.3
            v2bKeysToConsider: [
                'month_price',
                'quarter_price',
                'half_year_price',
                'year_price',
                'two_year_price',
                'three_year_price',
                'onetime_price',
                'reset_price'
            ],//2.1.3
            xbKeysToConsider: [
                'monthly',
                'quarterly',
                'half_yearly',
                'yearly',
                'two_yearly',
                'three_yearly',
                'onetime',
                'reset_traffic'
            ],//2.1.3
            tunJson: {
                address: [
                    "172.19.0.1/30",
                    "fdfe:dcba:9876::1/126"
                ],
                auto_route: true,
                endpoint_independent_nat: true,
                sniff: true,
                sniff_override_destination: true,
                stack: "system",
                strict_route: true,
                type: "tun"
            },

            isWin7: false,
            isReplying: false,
            isTicketSaveing: false,
            isTicketCloseing: false,
            isNewTicket: false,
            isSubmitNewTicket: false,
            ticketLevel: 0,
            ticketTitle: "",
            ticketMessage: "",
            replyTextContent: "",
            ticketInfo: "",
            showTicket: false,
            showTicketInfo: false,
            showTicketInfoing: false,
            withdraw_methods: [],
            select_withdraw_method: "",
            isWithdraw: false,
            isTransfer: false,
            transfer: "",
            withdrawAccount: "",
            tickets: [],
            isTicket: false,
            ticket: [],
            ticketCurrentPage: 1,
            ticketPageSize: 3,
            invite_commission_update_date: ""
        }
    },
    watch: {
        apptheme(newVal) {
            document.documentElement.style.setProperty('--app-theme-color', newVal);
        },
    },
    computed: {
        compiledMarkdown: function () {
            return marked(this.knowledgeText, { sanitize: true });
        },
        //2.1.3
        filteredOrders() {
            const term = (this.searchTerm || '').toLowerCase();
            if (!term) return this.orders;

            return this.orders.filter(order => {
                const searchableFields = [
                    order.id,
                    order.period,
                    order.status,
                    order.updated_at,
                    order.total_amount
                ];
                return searchableFields.some(field =>
                    String(field || '').toLowerCase().includes(term)
                );
            });
        },
        totalPages() {
            return Math.ceil(this.filteredOrders.length / this.pageSize);
        },
        inviterTotalPages() {
            return Math.ceil(this.invitedetails.length / this.pageSize);
        },
        paginatedOrders() {
            const start = (this.currentPage - 1) * this.pageSize;
            const end = start + this.pageSize;
            return this.filteredOrders.slice(start, end);
        },
        paginatedInviterData() {
            const start = (this.currentPage - 1) * this.pageSize;
            const end = start + this.pageSize;
            return this.invitedetails.slice(start, end);
        },
        ticketTotalPages() {
            return Math.ceil(this.tickets.length / this.ticketPageSize);
        },
        paginatedTicketData() {
            const start = (this.ticketCurrentPage - 1) * this.ticketPageSize;
            const end = start + this.ticketPageSize;
            return this.tickets.slice(start, end);
        }
    },
    beforeCreate() {
        onClickControl('getSystem', '')
    },
    created() {

        let self = this

        const storage = window.localStorage
        const apiUrl = storage.getItem("APP_API_URL")
        const _defaultTheme= "#0074FF";

        if (storage.getItem("APP_THEME") == null) {
            self.apptheme = _defaultTheme
            storage.setItem("APP_THEME", self.apptheme)
        } else {
            self.apptheme = storage.getItem("APP_THEME")
        }

        if (storage.getItem("APP_DATA_TUN") == null) {
            self.tunMode = "testb"
            storage.setItem('APP_DATA_TUN', 0)
        } else {
            if (storage.getItem("APP_DATA_TUN") == 1) {
                self.tunMode = "testa testani"
            } else {
                self.tunMode = "testb"
            }
        }

        ipc.on("deviceSystem", function (event, data) {
            self.isWin7 = data

            if (apiUrl == null) {
                //console.log("api null");
                self.initFetch()
            } else {
                self.url = apiUrl
                self.initApp()
                //console.log(`api ${apiUrl}`)
            }

            setTimeout(function () {
                $(".initDom").addClass("isHide")
                self.initConf()
            }, 1000)
        })
    },
    mounted() {

        const self = this
        const storage = window.localStorage
        const userInfo = JSON.parse(storage.getItem("APP_DATA_USER"));

        $(document).on('click', 'a[href^="http"]', function (event) {
            //console.log(event.target.href);
            shell.openExternal(event.target.href)
            event.preventDefault()
        })

        $(document).on('click', function () {
            self.isActiveMore = false
            self.isActiveLang = false
        })

        if (storage.getItem("APP_LANG") == null) {

            let _lang = navigator.language.toLowerCase()

            var containsZh = _lang.includes("zh");
            var containsVn = _lang.includes("vi");
            var containsFa = _lang.includes("fa");
            var containsHK = _lang.includes("hk");
            var containsTW = _lang.includes("tw");
            var containsKR = _lang.includes("kr");
            var containsJP = _lang.includes("jp");

            if (containsHK) {
                self.$i18n.locale = "hk"
            } else if (containsTW) {
                self.$i18n.locale = "hk"
            } else if (containsZh) {
                self.$i18n.locale = "cn"
            } else if (containsVn) {
                self.$i18n.locale = "vn"
            } else if (containsFa) {
                self.$i18n.locale = "fa"
            } else if (containsKR) {
                self.$i18n.locale = "kr"
            } else if (containsJP) {
                self.$i18n.locale = "jp"
            } else {
                self.$i18n.locale = "en"
            }

            //self.$i18n.locale = "fa"
            self.language = self.$i18n.locale

        } else {
            self.language = storage.getItem("APP_LANG")
            self.$i18n.locale = self.language
        }

        setTimeout(function () {

            self.updateTheme()
            HSThemeSwitch.autoInit();

            if (!localStorage.getItem('hs_theme')) {
                localStorage.setItem('hs_theme', 'auto')
            }
            //ipc.send('set-theme', localStorage.getItem('hs_theme'))

        }, 1000)

    },
    methods: {
        formattedContent(content) {
            return content.split(/<br\s*\/?>/)
        },
        initApp() {
            const self = this
            const storage = window.localStorage
            const userInfo = JSON.parse(storage.getItem("APP_DATA_USER"));

            self.initBridge()
            self.initC()
            self.initConfig()
            self.init()
            //self.initNotice()
            self.initUpdate()

            //add
            self.getPaymentMethod()
            self.getAppPlans()

            //2.1.3
            if (userInfo != null) {
                self.getAppAlert()
            }
        },
        async initFetch() {
            const self = this
            const storage = window.localStorage

            console.log("🚀 [初始化] 开始初始化 API 连接...");

            try {
                // 显示加载状态
                self.isLoading = true;

                await self.fetchAPIContent();  // 先获取并存储 api 列表

                if (!self.apiLists || self.apiLists.length === 0) {
                    throw new Error("未能获取到有效的 API 列表");
                }

                const data = await self.checkAPIEndpoints();  // 检查每个 api 是否包含 data

                let _apiUrl = data + "/"

                if (_apiUrl !== self.url) {
                    console.log("🔄 [初始化] API 地址已更改，重新初始化应用");
                    self.initApp()
                }

                setTimeout(function () {
                    self.url = _apiUrl
                    storage.setItem("APP_API_URL", _apiUrl)
                    console.log("✅ [初始化] API 连接初始化成功:", _apiUrl);
                }, 500)

                // self.url = _apiUrl
                // storage.setItem("APP_API_URL", _apiUrl)
                // self.initApp()

            } catch (error) {
                console.error("❌ [初始化] 初始化失败:", error);

                // 尝试使用缓存的 API 地址
                const cachedUrl = storage.getItem("APP_API_URL");
                if (cachedUrl) {
                    console.log("🔄 [初始化] 尝试使用缓存的 API 地址:", cachedUrl);
                    self.url = cachedUrl;
                    self.initApp();
                } else {
                    // 显示用户友好的错误信息，并提供重试选项
                    self.Toast("网络连接失败：无法连接到服务器，请检查网络连接", "error");
                    console.log("💡 [初始化] 提示：可以尝试刷新应用或重新启动程序");
                }
            } finally {
                self.isLoading = false;
            }
        },
        async updateApi() {
            const self = this
            const storage = window.localStorage

            try {
                await self.fetchAPIContent();  // 先获取并存储 api 列表

                if (!self.apiLists || self.apiLists.length === 0) {
                    throw new Error("未能获取到有效的 API 列表");
                }

                const data = await self.checkAPIEndpoints();  // 检查每个 api 是否包含 data

                let _apiUrl = data + "/"
                self.url = _apiUrl
                //storage.setItem("APP_API_URL", _apiUrl)
                self.initC()
                //self.initNotice()
                self.initUpdate()

                //console.log("✅ [API更新] API 更新成功:", _apiUrl);

            } catch (error) {
                //console.error("❌ [API更新] API 更新失败:", error);

                // 如果更新失败，继续使用当前的 URL
                if (self.url) {
                    //console.log("🔄 [API更新] 继续使用当前 API:", self.url);
                    self.initC();
                    self.initUpdate();
                } else {
                    // 显示用户友好的错误信息
                    self.Toast("API 更新失败：无法更新 API 连接，请检查网络", "warn");
                    //console.log("💡 [API更新] 提示：可以尝试重新启动应用");
                }
            }
        },
        buyOrder(payment) {
            const self = this
            self.selectedPayID = payment.id

            setTimeout(function () {
                self.isPay = true
                self.ordersave()
            }, 100)
        },
        getPaymentMethod() {
            const self = this
            fetch(self.url + "api/v1/app/apppaymentmethod", {
                method: 'GET',
                headers: {
                    'Accept': 'application/json, text/javascript, */*; q=0.01',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                }
            }).then(function (res) {

                res.json().then(function (obj) {
                    if (obj) {
                        if (obj.data != "") {
                            self.payments = obj.data
                            //self.selectedPayID = obj.data[0].id
                        }
                    }
                })
            })
                .catch((err) => {
                    self.getPaymentMethod()
                    console.log(err)
                })
        },
        getAppPlans() {
            const self = this
            self.isFetchPlaning = true

            self.plans = []
            self.selectedPlans = []

            fetch(self.url + "api/v1/app/appshop", {
                method: 'GET',
                headers: {
                    'Accept': 'application/json, text/javascript, */*; q=0.01',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                }
            }).then(function (res) {

                res.json().then(function (obj) {

                    self.isFetchPlaning = false

                    if (obj) {

                        if (obj.status == 1) {

                            self.plans = obj.data

                            if (obj.data.length > 0) {
                                var b = []
                                var a = obj.data[0]
                                var keysToConsider = self.v2bKeysToConsider
                                if (self.panelType === "v2board") {
                                    keysToConsider = self.v2bKeysToConsider
                                } else {
                                    keysToConsider = self.xbKeysToConsider
                                }
                                keysToConsider.forEach(key => {
                                    if (a[key] !== null && a[key] !== undefined) {
                                        b.push({ name: key, price: a[key] });
                                    }
                                })

                                self.selectedPlans = b
                            }

                        }
                    }
                })
            })
                .catch((err) => {
                    self.getAppPlans()
                    self.isFetchPlaning = false
                })
        },
        applyCoupon() {
            const self = this

            if (self.isPay) {
                return
            }

            self.animateCSS('.applyCouponBtn', 'loginButtonAni')

            if (self.isCouponIng) {
                return
            }
            self.isCouponIng = true

            if (self.discountCode == "" || self.discountCode == null) {
                self.Toast(self.$t('lang.couponinputerror'), "warn")
                self.isCouponIng = false
                return
            }

            const storage = window.localStorage
            const userInfo = JSON.parse(storage.getItem("APP_DATA_USER"))

            var timestamp = Date.parse(new Date())

            fetch(self.url + "api/v1/app/couponCheck?time=" + timestamp, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/javascript, */*; q=0.01',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                body: "code=" + self.discountCode + "&plan_id=" + self.selectedPlanID + "&token=" + userInfo.token
            }).then((resp) => {
                try {
                    return resp.json();
                } catch (err) {
                }
                return resp.text();

            }).then((res) => {

                console.log(res);

                if (res.message) {
                    self.isCouponIng = false
                    self.Toast(res.message, "warn")
                    return
                }

                if (res.status == 1) {
                    self.isCouponValue = res.data.value / 100
                    self.isCoupon = true
                    self.Toast(res.msg, "success");

                } else {
                    if (res.msg) {
                        self.Toast(res.msg, "warn");
                    } else {
                        self.Toast(res.message, "warn");
                    }
                }
                self.isCouponIng = false
            }).catch((err) => {
                self.isCouponIng = false
            })

        },
        ordersave() {
            const self = this
            const storage = window.localStorage
            const userInfo = JSON.parse(storage.getItem("APP_DATA_USER"))
            var timestamp = Date.parse(new Date())

            fetch(self.url + "api/v1/app/ordersave?time=" + timestamp, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/javascript, */*; q=0.01',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                body: "period=" + self.selectedPlanCycle + "&plan_id=" + self.selectedPlanID + "&token=" + userInfo.token + "&coupon_code=" + self.discountCode
            }).then((resp) => {
                try {
                    return resp.json();
                } catch (err) {
                }
                return resp.text();

            }).then((res) => {

                if (res.status === 1) {
                    self.selectedPlanOrderNo = res.data
                    self.checkout()
                } else if (res.status === -1) {
                    //订单取消成功 继续支付
                    self.ordersave()
                } else {
                    self.isPay = false
                    self.selectedPayID = null
                    if (res.msg) {
                        self.Toast(res.msg, "warn");
                    } else {
                        self.Toast(res.message, "warn");
                    }
                }
            }).catch((err) => {
                self.isPay = false
                self.selectedPayID = null
            })
        },
        checkout() {
            const self = this
            const storage = window.localStorage
            const userInfo = JSON.parse(storage.getItem("APP_DATA_USER"))
            var timestamp = Date.parse(new Date())

            fetch(self.url + "api/v1/app/checkout?time=" + timestamp, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/javascript, */*; q=0.01',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                body: "trade_no=" + self.selectedPlanOrderNo + "&method=" + self.selectedPayID + "&token=" + userInfo.token + "&usertoken=" + userInfo.token
            }).then((resp) => {
                try {
                    return resp.json();
                } catch (err) {
                }
                return resp.text();

            }).then((res) => {
                if (res.status === 1) {
                    self.detailOrder()
                    self.selectedPlanLink = res.data
                } else if (res.status === -1) {
                    //套餐购买成功 余额支付
                    self.Toast(res.msg, "success");
                    self.initConfig()
                    self.isPay = false
                    self.isShowPlanInfo = false
                    self.selectedPayID = null
                    self.update()
                } else {
                    self.isPay = false
                    self.selectedPayID = null
                    if (res.msg) {
                        self.Toast(res.msg, "warn");
                    } else {
                        self.Toast(res.message, "warn");
                    }
                }
            }).catch((err) => {
                self.selectedPayID = null
                self.isPay = false
            })
        },
        checkPayStaus() {

            const self = this
            const storage = window.localStorage;
            const userInfo = JSON.parse(storage.getItem("APP_DATA_USER"));

            self.isUpdateData = true

            fetch(self.url + "api/v1/app/checktrade", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/javascript, */*; q=0.01',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                body: "trade_no=" + self.selectedPlanOrderNo + "&token=" + userInfo.token
            }).then(function (res) {
                res.json().then(function (obj) {
                    if (obj) {
                        if (obj.status === 1 || obj.status === 3) {
                            self.isUpdateData = false
                            self.update()
                            self.initConfig()
                            self.isPayPopup = false
                            self.isPay = false
                            self.isShowPlanInfo = false
                            self.selectedPayID = null
                            self.Toast(self.$t('lang.planPurchaseSuccessful'), "warn")
                        } else if (obj.status === 0) {
                            self.isUpdateData = false
                            self.Toast(self.$t('lang.NoPayment'), "warn")
                        } else {
                            self.isUpdateData = false
                            self.Toast(self.$t('lang.Cancelled'), "warn")
                        }
                    }
                })
            })
                .catch((err) => {
                    self.isUpdateData = false
                })
        },
        ContinueToPay() {
            const self = this
            //self.selectedPlanLink
            shell.openExternal(self.selectedPlanLink)
            //self.sendMess("syncDown", {"name": "syncDown", "url": self.selectedPlanLink})
        },
        detailOrder(No) {
            const self = this
            const storage = window.localStorage
            const userInfo = JSON.parse(storage.getItem("APP_DATA_USER"))

            self.selectedPlantotalDiscountAmount = 0
            self.selectedPlantotalHandlingAmount = 0
            self.selectedPlantotalAmount = 0
            self.selectedBalanceAmount = 0

            fetch(self.url + "api/v1/app/orderdetail?token=" + userInfo.token + "&trade_no=" + self.selectedPlanOrderNo, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/javascript, */*; q=0.01',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
            }).then(function (res) {
                res.json().then(function (obj) {
                    if (obj) {
                        if (obj.status == 1) {
                            self.isPayPopup = true
                            self.selectedPlantotalHandlingAmount = obj.data.handling_amount / 100
                            self.selectedPlantotalDiscountAmount = obj.data.discount_amount / 100
                            self.selectedPlantotalAmount = obj.data.total_amount / 100
                            self.selectedBalanceAmount = obj.data.balance_amount / 100

                            if (self.selectedPlantotalHandlingAmount > 0) {
                                self.selectedPlantotalAmount = self.selectedPlantotalAmount + self.selectedPlantotalHandlingAmount
                            }

                            self.isPay = false

                            setTimeout(function () {
                                shell.openExternal(self.selectedPlanLink)
                                //self.sendMess("syncDown", {"name": "syncDown", "url": self.selectedPlanLink})
                            }, 300)

                        } else {
                            self.isPay = false
                            self.Toast(obj.msg, "warn")
                        }
                    }
                })
            })
                .catch((err) => {
                    self.isPay = false
                    console.log(err)
                });
        },
        ordercancel() {

            const self = this
            const storage = window.localStorage;
            const userInfo = JSON.parse(storage.getItem("APP_DATA_USER"));
            self.isUpdateData = true

            fetch(self.url + "api/v1/app/ordercancel", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/javascript, */*; q=0.01',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                body: "trade_no=" + self.selectedPlanOrderNo + "&token=" + userInfo.token
            }).then(function (res) {
                res.json().then(function (obj) {
                    if (obj) {
                        if (obj.status === 1) {
                            self.isUpdateData = false
                            self.isPay = false
                            self.isPayPopup = false
                            self.selectedPayID = null
                            self.isShowPlanInfo = false
                            self.Toast(obj.msg, "success")
                        } else {
                            self.isUpdateData = false
                            self.Toast(obj.msg, "warn")
                        }
                    }
                })
            })
                .catch((err) => {
                    //self.isUpdateData = false
                    console.log(err)
                })
        },
        cancelCoupon() {
            const self = this
            self.isCoupon = false
            self.isCouponValue = null
            self.discountCode = ""
            self.Toast(self.$t('lang.CanceledUseOfCoupon'), "warn")
        },
        selectPlan(_0x317125, _0x12e119) {
		  const _0x3d9d93 = this;
		  _0x3d9d93.selectOderName = _0x317125.name;
		  _0x3d9d93.selectedPlanID = _0x317125.id;
		  _0x3d9d93.isShowPlanInfo = true;
		  if (_0x317125 != null && _0x317125 != "") {
			var _0x41f3ea = [];
			_0x3d9d93.selectedPlanCycle = "";
			_0x3d9d93.selectedPlans = [];
			const _0x589092 = _0x3d9d93.panelType === "xboard";
			var _0x3727b6 = _0x3d9d93.v2bKeysToConsider;
			if (_0x3d9d93.panelType === "v2board") {
			  _0x3727b6 = _0x3d9d93.v2bKeysToConsider;
			} else {
			  _0x3727b6 = _0x3d9d93.xbKeysToConsider;
			}
			_0x3727b6.forEach(_0x5135e4 => {
			  let _0x19d45d;
			  if (_0x589092) {
				_0x19d45d = _0x317125.prices ? _0x317125.prices[_0x5135e4] : null;
			  } else {
				_0x19d45d = _0x317125[_0x5135e4];
			  }
			  if (_0x19d45d !== null && _0x19d45d !== undefined) {
				const _0x52d432 = {
				  name: _0x5135e4,
				  price: _0x19d45d
				};
				const _0x339cd0 = _0x52d432;
				const _0x240560 = _0x339cd0;
				_0x41f3ea.push(_0x240560);
				if (_0x3d9d93.selectedPlanCycle === "") {
				  _0x3d9d93.selectedPlanCycle = _0x5135e4;
				}
			  }
			});
			_0x3d9d93.selectedPlans = _0x41f3ea;
		  }
		},
        select(plan) {
            const self = this
            if (self.isPay) {
                return
            }
            self.selectedPlanCycle = plan.name
        },
        hidePlanInfo() {
            const self = this
            self.isShowPlanInfo = false
            self.selectedPayID = null
        },
        isHTML(str) {
            const htmlRegex = /<[^>]*>/;
            return htmlRegex.test(str);
        },
		isJSON(_0x315fac) {
		  try {
			JSON.parse(_0x315fac);
			return true;
		  } catch (_0x44c237) {
			return false;
		  }
		},
		formatJSON(_0x253dbd) {
		  try {
			const _0x5961ea = JSON.parse(_0x253dbd);
			if (!Array.isArray(_0x5961ea)) {
			  return JSON.stringify(_0x5961ea, null, 2);
			}
			let _0x1a61db = "<ul class=\"space-y-1\">";
			_0x5961ea.forEach(_0x32603b => {
			  const _0x1746b7 = _0x32603b.support ? "<svg class=\"mr-1 w-4 h-4 text-green-500\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n\t\t\t\t\t <polyline points=\"20 6 9 17 4 12\"></polyline>\n\t\t\t\t   </svg>" : "<svg class=\"mr-1 w-4 h-4 text-red-500\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n\t\t\t\t\t <line x1=\"18\" y1=\"6\" x2=\"6\" y2=\"18\"></line>\n\t\t\t\t\t <line x1=\"6\" y1=\"6\" x2=\"18\" y2=\"18\"></line>\n\t\t\t\t   </svg>";
			  _0x1a61db += "<li class=\"flex items-center\">" + _0x1746b7 + "<span class=\"text-sm text-gray-700 dark:text-neutral-200\">" + this.escapeHtml(_0x32603b.feature) + "</span></li>";
			});
			_0x1a61db += "</ul>";
			return _0x1a61db;
		  } catch (_0x5f48b4) {
			return _0x253dbd;
		  }
		},
		escapeHtml(_0x339647) {
		  const _0x1745f2 = document.createElement("div");
		  _0x1745f2.textContent = _0x339647;
		  return _0x1745f2.innerHTML;
		},
        winClose() {
            onClickControl("winHide", "")
        }, winMini() {
            onClickControl("winMini", "")
        },
        hideWeb() {
            this.isWebStore = false
        },
        initCrisp() {

            const self = this

            if (self.crispID == "") {
                return
            }

            window.$crisp = [];
            window.CRISP_WEBSITE_ID = self.crispID;//dev
            //window.CRISP_WEBSITE_ID = self.crispID;//dev
            (function () {
                var d = document;
                var s = d.createElement("script");
                s.src = "https://client.crisp.chat/l.js";
                s.async = 1;
                d.getElementsByTagName("head")[0].appendChild(s);
            })();


            window.CRISP_READY_TRIGGER = function () {

                $crisp.push(["config", "hide:on:away", [true]])
                $crisp.push(["do", "chat:hide"])

                setTimeout(function () {
                    $crisp.push(["config", "hide:on:away", [true]])
                    $(".crisp-client").addClass("isHide")
                }, 50)

                // setTimeout(function(){
                //     //self.Toast("客服系统加载成功后两s执行","success");
                //     $(".crisp-client").addClass("isHide")
                // },1000)

                //$("#crisp-chatbox").attr("data-full-view","true");
                $($("#crisp-chatbox").get(0).firstChild.firstChild.nextSibling).remove()

                self.isCrisp = true
                console.log("sdk ready1");

            };
        },
        copyInvite(type) {

            const self = this

            if (type == "code") {
                self.animateCSS('.codeCopy', 'loginButtonAni')
                self.Toast(self.$t("lang.copysuccessfully"), "success")

                if (navigator.clipboard) {
                    navigator.clipboard.writeText(self.accountCode);
                }

            } else {

                if (navigator.clipboard) {
                    // let shareLink = ""
                    // if (self.panelType == "v2board") {
                    //     shareLink = self.weburl + "#/register?code=" + self.accountCode
                    // } else {
                    //     shareLink = self.weburl + "auth/register?code=" + self.accountCode
                    // }

                    let _share = self.inviteUrl + self.invite_code

                    navigator.clipboard.writeText(_share);
                }

                //self.animateCSS('.linkCopy', 'loginButtonAni')
                self.Toast(self.$t("lang.copysuccessfully"), "success")

            }

        },
        invite() {
            const self = this
            self.showAccountInvite = true
            self.getAppinvite() //2.1.3
            self.getAppinvitedetails() //2.1.3
            setTimeout(function () {
                HSTabs.autoInit()
            }, 100)
        },
        isImageFile(filename) {
            var regex = /\.(jpeg|jpg|gif|png|svg)$/i;
            return regex.test(filename);
        },
        setColorCardHeight() {
            const self = this
            self.animateCSS('.colorCard', 'loginButtonAni')

            if (self.colorsHeight == 60) {
                self.colorsHeight = 230
            } else {
                self.colorsHeight = 60
            }
        },
        alphaToColor(hexColor, alpha) {
            const hex = hexColor.replace(/^#/, '');
            const bigint = parseInt(hex, 16);
            const r = (bigint >> 16) & 255;
            const g = (bigint >> 8) & 255;
            const b = bigint & 255;
            const clampedAlpha = Math.min(1, Math.max(0, alpha));
            return `rgba(${r}, ${g}, ${b}, ${clampedAlpha})`;
        },
        setTheme(theme) {
            const self = this
            const storage = window.localStorage
            storage.setItem("APP_THEME", theme.hex)
            self.apptheme = theme.hex
            self.sendMess("color", self.apptheme)
        },
        setAccountCardHeight() {
            const self = this

            if (self.accountCardHeight == 100) {
                self.accountCardHeight = 140
            } else {
                self.accountCardHeight = 100
            }
        },
        setLangCardHeight() {
            const self = this
            self.animateCSS('.langCard', 'loginButtonAni')
            if (self.langsHeight == 60) {
                self.langsHeight = 270
            } else {
                self.langsHeight = 60
            }
        },
        setLang(lang) {
            const self = this
            const storage = window.localStorage

            self.$i18n.locale = lang.code
            storage.setItem("APP_LANG", lang.code)
            self.language = lang.code
        },
        //2.1.3
        getRandomClass() {
            const randomIndex = Math.floor(Math.random() * this.classesList.length);
            return this.classesList[randomIndex];
        },
        updateTheme() {
            const self = this

            const html = document.querySelector('html');
            const currentTheme = localStorage.getItem('hs_theme') || 'auto';

            // 确定实际应该应用的主题
            let shouldBeDark = false;
            if (currentTheme === 'dark') {
                shouldBeDark = true;
            } else if (currentTheme === 'light') {
                shouldBeDark = false;
            } else if (currentTheme === 'auto') {
                shouldBeDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            }

            // 应用主题
            if (shouldBeDark) {
                html.classList.add('dark');
                html.classList.remove('light');
                self.isDarkorLight = "dark";
            } else {
                html.classList.remove('dark');
                html.classList.add('light');
                self.isDarkorLight = "light";
            }

            setTimeout(function () {
                HSThemeSwitch.autoInit();
            }, 500)

            //console.log('updateTheme:', currentTheme, 'shouldBeDark:', shouldBeDark, 'html classes:', html.className);
        },
        updateTheme1() {
            const self = this

            const html = document.querySelector('html');
            const isLightOrAuto = localStorage.getItem('hs_theme') === 'light' || (localStorage.getItem('hs_theme') === 'auto' && !window.matchMedia('(prefers-color-scheme: dark)').matches);
            const isDarkOrAuto = localStorage.getItem('hs_theme') === 'dark' || (localStorage.getItem('hs_theme') === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches);

            if (isLightOrAuto && html.classList.contains('dark')) {
                html.classList.remove('dark');
                self.isDarkorLight = "light"
            } else if (isDarkOrAuto && html.classList.contains('light')) {
                html.classList.remove('light');
                self.isDarkorLight = "dark"
            } else if (isDarkOrAuto && !html.classList.contains('dark')) {
                html.classList.add('dark');
                self.isDarkorLight = "dark"
            } else if (isLightOrAuto && !html.classList.contains('light')) {
                html.classList.add('light');
                self.isDarkorLight = "light"
            }

            //ipc.send('set-theme', localStorage.getItem('hs_theme'))
        },
        toggleAccordion(group, itemIndex) {
            const self = this
            self.isFetchKnowing = true
            $(".tosGuideText").html("")
            self.getGuideText(group.id, group)
            group.isOpen = true
        },
        getSystemTheme() {
            return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        },
        ConvertFlag(flag) {
            if (flag === "cn") {
                return "assets/flags/cn.png"
            } else if (flag === "en") {
                return "assets/flags/us.png"
            } else if (flag === "vn") {
                return "assets/flags/vn.png"
            } else if (flag === "hk") {
                return "assets/flags/hk.png"
            } else if (flag === "fa") {
                return "assets/flags/ir.png"
            } else if (flag === "kr") {
                return "assets/flags/kr.png"
            } else if (flag === "jp") {
                return "assets/flags/jp.png"
            }
        },
        getAppAlert() {
            const self = this
            const storage = window.localStorage
            const userInfo = JSON.parse(storage.getItem("APP_DATA_USER"));
            var token = ""
            if (userInfo == null) {

            } else {
                token = userInfo.token
            }

            fetch(self.url + "api/v1/app/appalert", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/javascript, */*; q=0.01',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                body: "token=" + token + "&lang=" + self.language
            }).then((resp) => {
                try {
                    return resp.json();
                } catch (err) {
                }
                return resp.text()

            }).then((res) => {

                if (res.status === 1) {
                    self.isAppAlert = true

                    if (self.isHTML(res.context)) {

                        self.AppAlertMessage = ""

                        setTimeout(function () {
                            $(".AppAlertMessage").html(res.context)
                        }, 100)
                    } else {
                        self.AppAlertMessage = res.context
                    }

                    self.AppAlertTitle = res.title
                    self.AppAlertImg = res.img
                    self.AppAlertTags = res.tags
                }

            }).catch((err) => {
                console.log(err);
            })

        },
        getAppinvitedetails() {

            const self = this
            const storage = window.localStorage
            const userInfo = JSON.parse(storage.getItem("APP_DATA_USER"));
            var token = ""
            if (userInfo == null) {

            } else {
                token = userInfo.token
            }

            fetch(self.url + "api/v1/app/invitedetails", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/javascript, */*; q=0.01',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                body: "token=" + token
            }).then((resp) => {
                try {
                    return resp.json();
                } catch (err) {
                }
                return resp.text()

            }).then((res) => {

                if (res.message) {
                    self.Toast(res.message, "error")
                    return
                }

                self.invitedetails = []

                if (res.data) {
                    self.invitedetails = res.data
                }

            }).catch((err) => {
                console.log(err);
            })

        },
        Generate_new_invitation_code() {
            const self = this
            const storage = window.localStorage
            const userInfo = JSON.parse(storage.getItem("APP_DATA_USER"));
            var token = ""
            if (userInfo == null) {

            } else {
                token = userInfo.token
            }

            self.isGenerateing = true

            fetch(self.url + "api/v1/app/inviteCodeNew", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/javascript, */*; q=0.01',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                body: "token=" + token
            }).then((resp) => {
                try {
                    return resp.json();
                } catch (err) {
                }
                return resp.text()

            }).then((res) => {

                self.isGenerateing = false

                if (res.msg) {
                    self.Toast(res.msg, "error")
                    return
                }

                if (res.status === 1) {
                    self.getAppinvite()
                    self.Toast(self.$t('lang.new_invitation_code_has_been_generated'), "success")
                }


            }).catch((err) => {
                self.isGenerateing = false
                console.log(err)
            })
        },
        getAppinvite() {

            const self = this
            const storage = window.localStorage
            const userInfo = JSON.parse(storage.getItem("APP_DATA_USER"));
            var token = ""
            if (userInfo == null) {

            } else {
                token = userInfo.token
            }

            self.isGenerateIngviteing = true

            fetch(self.url + "api/v1/app/appinvite", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/javascript, */*; q=0.01',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                body: "token=" + token
            }).then((resp) => {
                try {
                    return resp.json();
                } catch (err) {
                }
                return resp.text()

            }).then((res) => {

                self.isGenerateIngviteing = false

                if (res.message) {
                    self.Toast(res.message, "error")
                    return
                }

                if (res.status === 1) {
                    self.invite_code = res.code
                    self.invite_codes = res.codes
                    self.invite_commission_balance = res.invite_commission_balance / 100
                    self.invite_commission_rate = res.invite_commission_rate
                    self.invite_get_amount = res.invite_get_amount / 100
                    self.invite_uncheck_commission_balance = res.invite_uncheck_commission_balance / 100
                    self.invite_users = res.invite_users
                    self.invite_commission_update_date = self.getCurrentDateTime() //2.1.7add
                    self.accountMoney = res.user_balance //2.1.7add
                }

            }).catch((err) => {
                self.isGenerateIngviteing = false
                console.log(err)
            })

        },
        selectCode(code) {
            const self = this
            self.invite_code = code
        },
        formatOrderId(id) {
            if (!id || id.length < 6) return id;
            return `${id.slice(0, 3)}...${id.slice(-3)}`;
        },
        getOrders() {
            const self = this
            const storage = window.localStorage

            self.isFetchOrdersing = true

            const userInfo = JSON.parse(storage.getItem("APP_DATA_USER"));
            var token = ""
            if (userInfo == null) {

            } else {
                token = userInfo.token
            }
            //orders
            fetch(self.url + "api/v1/app/orderfetch?token=" + token, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json, text/javascript, */*; q=0.01',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                }
            }).then(function (res) {

                res.json().then(function (obj) {

                    self.orders = []
                    self.isFetchOrdersing = false

                    if (obj) {
                        if (obj.data) {
                            self.orders = obj.data
                        }
                    }
                })
            })
                .catch((err) => {
                    self.getOrders()
                    self.isFetchOrdersing = false
                })
        },
        getAppPlans() {
            const self = this
            self.isFetchPlaning = true

            self.plans = []
            self.selectedPlans = []

            fetch(self.url + "api/v1/app/appshop", {
                method: 'GET',
                headers: {
                    'Accept': 'application/json, text/javascript, */*; q=0.01',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                }
            }).then(function (res) {

                res.json().then(function (obj) {

                    self.isFetchPlaning = false

                    if (obj) {

                        if (obj.status == 1) {

                            self.plans = obj.data

                            if (obj.data.length > 0) {
                                var b = []
                                var a = obj.data[0]
                                var keysToConsider = self.v2bKeysToConsider
                                if (self.panelType === "v2board") {
                                    keysToConsider = self.v2bKeysToConsider
                                } else {
                                    keysToConsider = self.xbKeysToConsider
                                }
                                keysToConsider.forEach(key => {
                                    if (a[key] !== null && a[key] !== undefined) {
                                        b.push({ name: key, price: a[key] });
                                    }
                                })

                                self.selectedPlans = b
                            }

                        }
                    }
                })
            })
                .catch((err) => {
                    self.getAppPlans()
                    self.isFetchPlaning = false
                })
        },
        initUpdate() {

            const self = this

            fetch(self.url + "api/v1/app/appupdate", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/javascript, */*; q=0.01',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                body: "system=windows&version=" + self.appVersion
            }).then((resp) => {
                try {
                    return resp.json();
                } catch (err) {
                }
                return resp.text()

            }).then((res) => {

                if (res.message) {
                    self.Toast(res.message, "error")
                    return
                }
                if (res.status == 1) {
                    self.isUpdate = true
                    self.updateLink = res.link
                    self.updateMsg = res.msg
                    self.updateContextArr = res.update_context
                }

            }).catch((err) => {
                console.log(err);
            })

        },
        changeLang(e) {
            const self = this
            self.isActiveLang = !self.isActiveLang
            //self.isActiveMore = !self.isActiveMore
            e.stopPropagation();
            setTimeout(function () {
                self.isActiveMore = !self.isActiveMore
            }, 5)
        },
        updateApp() {
            const self = this
            shell.openExternal(self.updateLink)
        },
        //newadd
        task1() {
            const self = this
            self.statusText = "Getting_Ethernet"
            setTimeout(() => {
                self.task2()
            }, 2000)
        },
        task2() {
            const self = this
            self.statusText = "Configuring_Ethernet"
            setTimeout(() => {
                self.task3()
            }, 1500)
        },
        task3() {
            const self = this
            self.statusText = "Starting_Ethernet"
        },
        formatBytes(bytes, decimals = 2) {
            if (bytes === 0) return '0 Bytes';
            const k = 1024;
            const dm = decimals < 0 ? 0 : decimals;
            const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
        },
        initBridge() {
            const self = this
            const storage = window.localStorage;
            const userInfo = JSON.parse(storage.getItem("APP_DATA_USER"));

            ipc.on('system-theme-changed', (event, isDark) => {
                //console.log('system-theme-changed:' + localStorage.getItem('hs_theme'));
                if (localStorage.getItem('hs_theme') === 'auto') {
                    self.updateTheme()
                    HSThemeSwitch.autoInit();
                    //console.log('system-theme-changed === auto ~');
                }
            })

            ipc.on('theme-changed', (event, isDark) => {
                console.log('theme-changed');
                const cur = localStorage.getItem('hs_theme');
                if (cur === 'auto' || !cur) {
                    self.updateTheme()
                }
            })

            ipc.on("appExit", function (event, data) {
                console.log('appExit');
                if (data != null) {
                    if (self.wsServer != null) {
                        self.wsServer.close()
                    }
                }
            })

            ipc.on("applog", function (event, data) {
                //console.log(`applog ${data}`);
            })

            ipc.on("syncConfig", function (event, data) {

                var enkey = "xxab3connohy2key";
                var eniv = "8c97f304skya60e0";

                let aesStr = self.AESdecrypt(data, enkey, eniv)
                //console.log("run syncConfig");
                //console.log(JSON.parse(aesStr));

            })

            ipc.on("coreStatus", function (event, data) {
                console.log("core state:" + data);
                if (data != null) {
                    self.isCoreing = false
                    if (data == "true") {
                        self.isCore = true
                    }
                }
            })

            ipc.on("statusJS", function (event, data) {

                if (data != null) {

                    if (data == "false") {
                        self.isStart = false
                        self.switchMode = ""
                        self.statusText = "disconnect"
                        self.Reset()
                        self.tfUp = "0.0B"
                        self.tfDown = "0.0B"
                        self.tfupTotal = 0
                        self.tfdownTotal = 0

                        if (self.wsServer != null) {
                            self.wsServer.close()
                        }

                    } else if (data == "error") {
                        self.switchMode = ""
                        self.isStart = false
                        self.statusText = "disconnect"
                        self.Toast(self.$t("lang.startErr"), "warn")
                        self.Reset()
                        self.tfUp = "0.0B"
                        self.tfDown = "0.0B"
                        self.tfupTotal = 0
                        self.tfdownTotal = 0
                        if (self.wsServer != null) {
                            self.wsServer.close()
                        }
                    } else if (data == "disconnecting") {

                        self.statusText = "disconnecting"

                    } else if (data == "ing") {
                        self.switchMode = ""
                        self.isStart = true
                        self.statusText = "connecting"
                        //self.startTimeFunc(false)
                        //self.task1()
                    } else {
                        self.switchMode = "testa"
                        self.isStart = true
                        self.statusText = "connected"
                        self.startTimeFunc(true)

                        if (self.wsServer != null) {
                            self.wsServer.close()
                        }

                        setTimeout(function () {
                            self.clashMode()
                            self.tfUp = "0.0B"
                            self.tfDown = "0.0B"
                            self.tfupTotal = 0
                            self.tfdownTotal = 0
                            self.wsServer = self.connectWebSocket('ws://127.0.0.1:9790/traffic')
                        }, 1000)
                    }

                    setTimeout(function () {
                        self.isStarting = false
                    }, 2000)
                }
            })

        },
        clashMode(isRead) {

            const storage = window.localStorage;
            const self = this

            if (storage.getItem('APP_DATA_MODE') == "" || storage.getItem('APP_DATA_MODE') == null) {
                storage.setItem('APP_DATA_MODE', 0)
            }

            if (storage.getItem('APP_DATA_INDEX') == "" || storage.getItem('APP_DATA_INDEX') == null) {
                storage.setItem('APP_DATA_INDEX', 0)
            }

            //self.mode = storage.getItem('APP_DATA_MODE');
            //self.nodeIndex = parseInt(storage.getItem('APP_DATA_INDEX'))
            let _rule = ""

            if (self.mode == 1) {
                self.globalMode = "testa testani"
                _rule = "Global"
                axios
                    .patch("http://127.0.0.1:9790/configs/", {
                        mode: _rule
                    })
                    .then(res => {
                        if (res.status == 204) {
                            self.putProxy()
                        }
                    })
                    .catch(e => {
                        console.log(e)
                    })
            } else {

                self.globalMode = "testb"
                _rule = "Rule"
                axios//
                    .patch("http://127.0.0.1:9790/configs/", {
                        mode: _rule
                    })
                    .then(res => {
                        if (res.status == 204) {
                            self.putProxy()
                        }
                    })
                    .catch(e => {
                        console.log(e)
                    })
            }

            // if(isRead){
            //     self.syncClash()
            // }
        },
        putProxy() {

            const self = this
            const storage = window.localStorage;
            let userInfo = null;
            try {
                const userStr = storage.getItem("APP_DATA_USER");
                if (userStr) {
                    userInfo = JSON.parse(userStr);
                }
            } catch (e) {
                console.error('获取用户信息失败:', e);
            }

            // 获取clash_group_name，如果没有则使用默认值RULE
            const clashGroupName = (userInfo && userInfo.clash_group_name) ? userInfo.clash_group_name : 'RULE';

            let url = `http://127.0.0.1:9790/proxies/${encodeURIComponent(clashGroupName)}`

            if (self.mode == 0) {
                url = `http://127.0.0.1:9790/proxies/${encodeURIComponent(clashGroupName)}`
            } else {
                url = `http://127.0.0.1:9790/proxies/GLOBAL`
            }

            axios
                .put(url, {
                    name: self.isCurreNodeName
                })
                .then(res => {
                    console.log("changeDone");
                })
                .catch(e => {
                    console.log(url, e)
                })
        },
        init(isLogin, isUpdate) {

            const storage = window.localStorage;
            const self = this

            const userInfo = JSON.parse(storage.getItem("APP_DATA_USER"));

            if (storage.getItem('APP_DATA_MODE') == "" || storage.getItem('APP_DATA_MODE') == null) {
                storage.setItem('APP_DATA_MODE', 0)
            }

            if (storage.getItem('APP_DATA_INDEX') == "" || storage.getItem('APP_DATA_INDEX') == null) {
                storage.setItem('APP_DATA_INDEX', 0)
            }

            self.mode = storage.getItem('APP_DATA_MODE');
            self.nodeIndex = parseInt(storage.getItem('APP_DATA_INDEX'))

            if (self.mode == 1) {
                self.globalMode = "testa testani"
            } else {
                self.globalMode = "testb"
            }

            if (userInfo) {
                self.initSupportFile()

                if (!isLogin) {
                    self.update()
                } else if (isLogin == "login") {
                    self.initConf()
                } else if (isLogin === "sync") {
                    self.initConf()
                    console.log('run sync');
                } else {
                    console.log("run login ");
                }

                self.user = userInfo
                self.isLogin = true
                //self.isShowHome = true
                self.isShowLogin = false
                self.accountID = userInfo.accountID;
                self.accountName = userInfo.email;
                self.accountExpire = userInfo.expire;
                //self.accountMoney = userInfo.money;
                self.accountPlan = userInfo.plan;
                self.accountBandwidth = userInfo.transferEnable;
                self.accountUserTf = userInfo.useTf;
                self.accountTfPercentage = userInfo.tfPercentage;
                self.accountdays = userInfo.accountdays
                self.accountCode = userInfo.code


                if (self.accountExpire != "") {
                    if (self.isExpired(self.accountExpire)) {
                        self.isShowAccountExp = true
                        self.isAccountExp = true
                        if (self.isStart) {
                            self.sendMess("stopProxy", { "name": "stopProxy" })
                            self.isStart = false
                            self.Reset()
                        }
                    } else {
                        self.isShowAccountExp = false
                        self.isAccountExp = false
                    }
                }

                if (self.accountTfPercentage === 0) {
                    self.isAccountExhausted = true
                    self.isShowAccountTrafficExhausted = true
                    if (self.isStart) {
                        self.sendMess("stopProxy", { "name": "stopProxy" })
                        self.isStart = false
                        self.Reset()
                    }
                } else {
                    self.isAccountExhausted = false
                    self.isShowAccountTrafficExhausted = false
                }

                if (!isUpdate) {
                    self.isShowHome = true
                    self.initConf()
                }

                if (self.isCore) {

                } else {
                    if (!self.isCoreing) {
                        onClickControl('InitCore', self.getTunState())
                    }
                }

            } else {
                self.isLogin = false
                self.isShowHome = false
                self.isShowLogin = true
            }

        },
        isExpired(expirationDate) {
            var currentDate = new Date();
            var expiration = new Date(expirationDate);
            if (expiration < currentDate) {
                return true; // 过期
            } else {
                return false; // 未过期
            }
        },
        connectWebSocket(url) {
            const socket = new WebSocket(url);

            const self = this

            // 当连接打开时触发
            socket.onopen = function (event) {
                console.log('WebSocket连接已打开');
            };

            // 当接收到消息时触发
            socket.onmessage = function (event) {
                const message = event.data;
                const _tf = JSON.parse(event.data);
                self.tfupTotal += parseInt(_tf.up)
                self.tfdownTotal += parseInt(_tf.down)
                self.tfUp = self.formatBytes(parseInt(self.tfupTotal))
                self.tfDown = self.formatBytes(parseInt(self.tfdownTotal))
            };

            // 当连接关闭时触发
            socket.onclose = function (event) {
                console.log('WebSocket连接已关闭');
            };

            // 当发生错误时触发
            socket.onerror = function (event) {
                console.error('WebSocket发生错误:', event);
            };

            // 关闭WebSocket连接
            function closeWebSocket() {
                socket.close();
            }

            return {
                close: closeWebSocket
            };
        },
        initConf() {

            let self = this;
            const storage = window.localStorage;

            if (storage.getItem("APP_DATA_USER") != null) {

                let userobj = storage.getItem("APP_DATA_USER")
                let user = JSON.parse(userobj)
                let _node = user.configsNodes
                let _nodedata = user.clash

                // 处理nodes相关（使用原来的key和iv，保持原逻辑）
                if (_node != "" && _node != undefined) {
                    self.nodes = []
                    let key = "apps_connect_key";
                    let iv = "8c97f304422a60e0";
                    let data = self.AESdecrypt(_node, key, iv)
                    if (data != "") {
                        self.nodes = JSON.parse(data)
                    }
                }

                // 单独处理clash数据（使用新的key和iv，并保存）
                if (_nodedata != "" && _nodedata != undefined) {
                    // clash数据使用新的key和iv
                    let clashKey = "9f34a6d1c2b89e4f";
                    let clashIv = "7bd39fa1024cc9e3";
                    let nodedata = self.AESdecrypt(_nodedata, clashKey, clashIv)

                    if (nodedata != "") {
                        let configHash = self.simpleHash(nodedata);
                        let configChanged = (self.lastConfigHash === "" || self.lastConfigHash !== configHash);
                        if (configChanged) {

                            self.lastConfigHash = configHash;
                            onClickControl('saveSysConfig', nodedata)
                            // if (self.isStart) {

                            //     if (self.initConfRestartTimer) {
                            //         clearTimeout(self.initConfRestartTimer);
                            //     }

                            //     self.initConfRestartTimer = setTimeout(function () {
                            //         self.initConfRestartTimer = null;
                            //         if (self.isStart) {
                            //             console.log("执行内核重启");
                            //             self.clashMode(true);
                            //             setTimeout(function () {
                            //                 onClickControl('Connect', self.getTunState())
                            //             }, 1500);
                            //         } else {
                            //             console.log("内核已停止，取消重启");
                            //         }
                            //     }, 1000); // 1秒防抖，避免频繁重启
                            // }
                        }
                    } else {
                        self.lastConfigHash = "";
                    }
                } else {
                    // 如果没有clash数据，清除hash
                    self.lastConfigHash = "";
                }

            }

            if (self.nodes.length > 0) {
                if (self.nodes.length > 0) {
                    if (storage.getItem("APP_DATA_INDEX") != null) {
                        let nodeI = storage.getItem("APP_DATA_INDEX")
                        if (parseInt(nodeI) > parseInt(self.nodes.length) - 1) {
                            self.nodeIndex = 0
                            self.nodeName = self.nodes[0].name
                            self.nodeInfo = self.nodes[0].info
                            self.node = self.nodes[0]
                            self.isCurreNodeName = self.nodes[0].name
                            self.isCurreNodeFlags = self.nodes[0].flag
                            storage.setItem('APP_DATA_INDEX', 0)
                        } else {
                            self.nodeIndex = parseInt(nodeI)
                            self.nodeName = self.nodes[self.nodeIndex].name;
                            self.nodeInfo = self.nodes[self.nodeIndex].info
                            self.node = self.nodes[self.nodeIndex]
                            self.isCurreNodeName = self.nodes[self.nodeIndex].name
                            self.isCurreNodeFlags = self.nodes[self.nodeIndex].flag
                        }
                    }
                }


            }
        },
        flagtoImg(flag) {
            if (flag != "") {
                return "assets/flags/" + flag.toLowerCase() + ".png"
            }
        },
        // 简单的hash函数，用于检测配置是否改变
        simpleHash(str) {
            if (!str) return "";
            let hash = 0;
            for (let i = 0; i < str.length; i++) {
                const char = str.charCodeAt(i);
                hash = ((hash << 5) - hash) + char;
                hash = hash & hash; // Convert to 32bit integer
            }
            return hash.toString();
        },
        AESencrypt(text, key, iv) {
            key = CryptoJS.enc.Utf8.parse(key);
            iv = CryptoJS.enc.Utf8.parse(iv);
            var encryptedData = CryptoJS.AES.encrypt(text, key, {
                iv: iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            });
            return encryptedData.toString();
        },
        AESdecrypt(ciphertext, key, iv) {
            key = CryptoJS.enc.Utf8.parse(key)
            iv = CryptoJS.enc.Utf8.parse(iv)
            const decryptedData = CryptoJS.AES.decrypt(ciphertext, key, {
                iv,
                padding: CryptoJS.pad.Pkcs7
            })
            return decryptedData.toString(CryptoJS.enc.Utf8)
        },
        // API 地址解密函数
        decryptApiHosts() {
            const self = this;
            const cryptoKey = "1cb2ec79ed8fb53ecc9fb7caa9ea777f";
            const cryptoIv = "ff6daf196c28c8a2";

            try {
                self.apihost = self.hostConfig.map(encryptedUrl => {
                    return self.AESdecrypt(encryptedUrl, cryptoKey, cryptoIv);
                }).filter(url => url && url.startsWith('https://'));

                // 验证解密结果
                if (self.apihost.length === 0) {
                    console.error('API地址解密失败');
                    return false;
                }
                return true;
            } catch (error) {
                console.error('API地址解密错误:', error);
                return false;
            }
        },
        // API 地址完整性验证
        validateApiHosts() {
            const self = this;
            const expectedDomains = [
                'myqcloud.com',
                'cos.ap-shanghai',
                'aliyuncs.com',
                'oss-cn-hongkong'
            ];

            return self.apihost.every(url => {
                return expectedDomains.some(domain => url.includes(domain));
            });
        },
        pingNode() {
            const self = this
            if (self.isStart) {
                // self.isShowPingToast = true
                // setTimeout(function () {
                //     self.isShowPingToast = false;
                // }, 2000)
                // return
            }

            if (self.isPing) {
                return
            }

            if (self.isCore) {
                self.pingIndex = -1
                self.nodeTcpping(self.pingIndex)
            } else {
                self.pingIndex = 0
                self.nodesTcpPing(self.pingIndex)
            }

            // if(self.isStart) {
            //     self.pingIndex = -1
            //     self.nodeTcpping(self.pingIndex)
            // } else {
            //     self.pingIndex = 0
            //     self.nodesTcpPing(self.pingIndex)
            // }
        },
        nodeTcpping(index) {

            const self = this

            let nlength = self.nodes.length - 1

            if (self.pingIndex === nlength) {
                self.isPing = false
                self.pingIndex = -1
                self.testMsg = "相等"
                return
            }

            self.pingIndex = self.pingIndex + 1
            let name = self.nodes[self.pingIndex].name
            self.isPing = true

            if (name === "AutoSelect") {
                self.nodeTcpping(self.pingIndex)
            } else {

                let url = "http://127.0.0.1:9790/proxies/" + encodeURI(name) + "/delay?timeout=5000&url=http://www.gstatic.com/generate_204"

                fetch(url, {
                    method: 'GET',
                }).then((resp) => {
                    try {
                        return resp.json();
                    } catch (err) {
                    }
                    return resp.text();
                }).then((res) => {

                    if ("message" in res) {
                        self.nodes[self.pingIndex].ping = -1
                        self.nodes.sort()
                    } else if ("delay" in res) {

                        if (res.delay > 300) {
                            self.nodes[self.pingIndex].ping = parseInt(res.delay / 4)
                        } else {
                            self.nodes[self.pingIndex].ping = parseInt(res.delay / 2)
                        }
                        self.nodes.sort()
                    } else {
                        self.nodes[self.pingIndex].ping = -1
                        self.nodes.sort()
                    }

                    self.nodeTcpping(self.pingIndex)

                }).catch((err) => {
                    self.nodes[self.pingIndex].ping = -1
                    self.nodes.sort()
                    self.nodeTcpping(self.pingIndex)
                })

            }

        },
        tcpPing(host, port) {
            const justNow = Date.now()
            const socket = new net.Socket()
            socket.setTimeout(5000)
            return new Promise((resolve, reject) => {
                socket.on('connect', () => {
                    resolve(Date.now() - justNow)
                    socket.destroy()
                }).on('error', e => {
                    reject(0)
                }).on('timeout', () => {
                    reject(0)
                }).connect(port, host)
            })
        },
        async nodesTcpPing() {
            const self = this
            self.isPing = true

            if (self.nodes.length > 0) {
                self.nodes.forEach(async _node => {

                    if (_node.name == "AutoSelect" || _node.type == "hysteria") {
                        self.pingIndex = self.pingIndex + 1
                    } else {
                        try {

                            let _ping = await self.tcpPing(_node.server, _node.server_port)

                            if (_ping > 300) {
                                _node.ping = parseInt(_ping / 4)
                            } else {
                                _node.ping = parseInt(_ping / 2)
                            }

                            //_node.ping = await self.tcpPing(_node.server, _node.server_port)
                            self.pingIndex = self.pingIndex + 1
                            self.nodes.sort()
                            if (_node.name == self.name) {
                                self.ms = _node.ping
                            }
                        } catch (error) {
                            _node.ping = -1
                            self.pingIndex = self.pingIndex + 1
                        }

                        if (self.pingIndex == self.nodes.length) {
                            self.isPing = false
                            self.pingIndex = 0
                        }
                    }

                })
            } else {
                self.isPing = false
            }
        },
        initNotice() {
            const self = this

            //self.animateCSS('.initNoticeBtn', 'loginButtonAni')

            self.isFetchNotice = true
            let timestamp = new Date().getTime();

            fetch(self.url + "api/v1/app/appnotice?" + timestamp, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json, text/javascript, */*; q=0.01',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
            }).then((resp) => {
                try {
                    return resp.json();
                } catch (err) {
                }
                return resp.text();

            }).then((res) => {

                self.noticeList = []
                self.isFetchNotice = false

                if (res.message) {
                    self.Toast(res.message, "error")
                    return
                }
                if (res.data) {
                    self.noticeList = res.data
                }
            }).catch((err) => {
                self.isFetchNotice = false
                console.log(err)
            });
        },
        initSupportFile() {

            const self = this

            var _lang = "zh-CN"

            if (self.language == "en") {
                _lang = "en-US"
            } else if (self.language == "vi") {
                _lang = "vi-VN"
            } else if (self.language == "fa") {
                _lang = "fa-IR"
            } else {
                _lang = "zh-CN"
            }

            self.isFetchKnowledge = true
            let timestamp = new Date().getTime();

            fetch(self.url + "api/v1/app/appknowledge?language=" + _lang + "&" + timestamp, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json, text/javascript, */*; q=0.01',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
            }).then((resp) => {
                try {
                    return resp.json();
                } catch (err) {
                }
                return resp.text();

            }).then((res) => {

                self.isFetchKnowledge = false

                if (res.message) {
                    self.Toast(res.message, "error")
                    return
                }

                self.guideList = []

                if (res.data) {

                    let keys = Object.keys(res.data)
                    for (let i = 0; i < keys.length; i++) {
                        res.data[keys[i]].forEach(function (e) {
                            e.isOpen = false
                            self.guideList.push(e)
                        })
                    }

                    // for (var tmp in res.data) {
                    //     let guide = {
                    //         category: tmp,
                    //         data: res.data[tmp]
                    //     }
                    //
                    //     self.guideList.push(guide)
                    // }

                    setTimeout(function () {
                        HSAccordion.autoInit()
                    }, 100)
                }
            }).catch((err) => {
                self.isFetchKnowledge = false
                console.log(err)
            });
        },
        animateCSS(element, animation) {
            var prefix = "";
            return (
                // We create a Promise and return it
                new Promise(function (resolve, reject) {
                    var animationName = '' + prefix + animation;
                    var node = document.querySelector(element);

                    node.classList.add(prefix + 'animated', animationName);

                    function handleAnimationEnd(event) {
                        event.stopPropagation();
                        node.classList.remove(prefix + 'animated', animationName);
                        resolve('Animation ended');
                    }

                    node.addEventListener('animationend', handleAnimationEnd, { once: true });
                })
            );
        },
        setUpdate(isUp) {

            const storage = window.localStorage;
            const self = this

            const userInfo = JSON.parse(storage.getItem("APP_DATA_USER"));
            if (storage.getItem('APP_DATA_MODE') == "" || storage.getItem('APP_DATA_MODE') == null) {
                storage.setItem('APP_DATA_MODE', 0)
            }

            if (storage.getItem('APP_DATA_INDEX') == "" || storage.getItem('APP_DATA_INDEX') == null) {
                storage.setItem('APP_DATA_INDEX', 0)
            }

            if (userInfo) {
                self.user = userInfo
                self.isLogin = true
                //self.isShowHome = true
                self.isShowLogin = false
                self.accountID = userInfo.accountID;
                self.accountName = userInfo.email;
                self.accountExpire = userInfo.expire;
                //self.accountMoney = userInfo.money;
                self.accountPlan = userInfo.plan;
                self.accountBandwidth = userInfo.transferEnable;
                self.accountUserTf = userInfo.useTf;
                self.accountTfPercentage = userInfo.tfPercentage;
                self.accountdays = userInfo.accountdays
                self.accountCode = userInfo.code

                if (self.accountTfPercentage === 0) {
                    self.isAccountExhausted = true
                    self.isShowAccountTrafficExhausted = true
                    if (self.isStart) {
                        self.sendMess("stopProxy", { "name": "stopProxy" })
                        self.isStart = false
                        self.Reset()
                    }
                } else {
                    self.isAccountExhausted = false
                    self.isShowAccountTrafficExhausted = false
                }

                if (self.accountExpire !== "") {

                    if (self.isExpired(self.accountExpire)) {

                        self.isShowAccountExp = true
                        self.isAccountExp = true

                        if (self.isStart) {
                            self.sendMess("stopProxy", { "name": "stopProxy" })
                            self.isStart = false
                            self.Reset()
                        }

                    } else {
                        self.isShowAccountExp = false
                        self.isAccountExp = false
                    }
                }

            }
        },
        initConfig() {

            const self = this
            const storage = window.localStorage

            let currentTimestamp = Date.now();

            self.updateApi()

            // fetch(self.hostUrl+"?time=" + currentTimestamp, {
            //     method: 'GET',
            //     headers: {
            //         'Accept': 'application/json, text/javascript, */*; q=0.01',
            //         'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            //     },
            // }).then((resp) => {
            //     try {
            //         return resp.json();
            //     } catch (err) {
            //     }
            //     return resp.text();
            //
            // }).then((res) => {
            //
            //     if (res.url) {
            //         //let _apiUrl = "https://" + res.url + "/"
            //         let _apiUrl = res.url + "/"
            //         self.url = _apiUrl
            //         storage.setItem("APP_API_URL", _apiUrl)
            //         self.initC()
            //         self.initNotice()
            //         self.initUpdate()
            //     }
            //
            // }).catch((err) => {
            //     console.log(err);
            // })
        },
        initC() {

            const self = this
            const storage = window.localStorage;
            const userInfo = JSON.parse(storage.getItem("APP_DATA_USER"));
            var token = ""
            if (userInfo == null) {

            } else {
                token = userInfo.token
            }

            fetch(self.url + "api/v1/app/config?token=" + token, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json, text/javascript, */*; q=0.01',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
            }).then(function (res) {
                res.json().then(function (obj) {

                    if (obj.data) {

                        if (obj.data.emailWhitelistSuffix.length > 0) {
                            self.emailList = obj.data.emailWhitelistSuffix
                            //self.signEmailSelect = obj.data.emailWhitelistSuffix[0]
                        }

                        if (obj.data.appDescription) {
                            self.appDescription = obj.data.appDescription;
                        }

                        if (obj.data.appName) {
                            self.appName = obj.data.appName;
                        }

                        if (obj.data.icon) {
                            self.appLogo = obj.data.icon;
                        }

                        if (obj.data.appUrl) {
                            //self.weburl = obj.data.appUrl
                        }

                        if (obj.data.currency_symbol == "" || obj.data.currency_symbol == null) {

                        } else {
                            self.currency_symbol = obj.data.currency_symbol
                        }


                        if (obj.data.withdraw_methods == "" || obj.data.withdraw_methods == null) {

                        } else {
                            self.withdraw_methods = obj.data.withdraw_methods
                            self.select_withdraw_method = obj.data.withdraw_methods[0]
                        }


                        if (obj.data.isInviteForce == 1) {
                            self.isNeedInvite = true;
                        }

                        // if (obj.data.crispID == null || obj.data.crispID == "") {
                        //     self.crispID = ""
                        // } else {
                        //     if(self.crispID == null || self.crispID === "") {
                        //         self.crispID = obj.data.crispID
                        //         self.initCrisp()
                        //     }
                        // }

                        if (obj.data.chatUrl == null || obj.data.chatUrl == "") {
                            self.chatUrl = ""
                        } else {
                            if (self.chatUrl == null || self.chatUrl === "") {
                                self.chatUrl = obj.data.chatUrl
                            }
                        }

                        if (obj.data.chatType === "" || obj.data.chatType == null) {

                        } else {
                            self.chatType = obj.data.chatType
                        }

                        if (obj.data.chatLink === "" || obj.data.chatLink == null) {

                        } else {
                            self.chatLink = obj.data.chatLink
                        }

                        if (obj.data.isSupport) {
                            self.isSupport = true
                        } else {
                            self.isSupport = false
                        }

                        if (obj.data.chatID === "" || obj.data.chatID == null) {

                        } else {
                            self.chatID = obj.data.chatID
                            if (self.chatType === "crisp") {
                                self.crispID = obj.data.chatID
                                self.initCrisp()
                            }
                        }

                        if (obj.data.panelType === "" || obj.data.panelType == null) {

                        } else {
                            self.panelType = obj.data.panelType
                        }

                        if (obj.data.inviteUrl === "" || obj.data.inviteUrl === null) {

                        } else {
                            self.inviteUrl = obj.data.inviteUrl
                        }

                        if (obj.data.isEmailVerify == 1) {
                            self.isEmailVerify = true;
                        }

                        if (obj.data.tggroup != "") {
                            self.isTggroup = true
                            self.tggrouplink = obj.data.tggroup
                        }

                        if (obj.data.tos != "") {
                            self.isTos = true
                            self.toslink = obj.data.tos
                        }

                        if (obj.data.privacy != "") {
                            self.isPP = true
                            self.pplink = obj.data.privacy
                        }

                        if (obj.data.website != "") {
                            self.isWebsite = true
                            self.weblink = obj.data.website
                            self.weburl = obj.data.website + '/'
                        }

                    }
                })
            })
        },
        showGuide(id, e) {

            const self = this

            const ethis = e.target.parentNode.parentNode

            var parent = $(ethis);
            var parent_img = $(ethis).find("svg");

            if (self.isShow == id) {
                $(".tosGuideList").css({
                    height: '65px'
                })
                $(".tosGuideList svg").css({
                    transform: "rotate(0)"
                });
                self.isShow = ""
                return
            }

            self.getGuideText(id)
            self.isShow = id

            $(".tosGuideText").text("加载中...")
            $(".tosGuideList").css({
                height: '65px'
            })
            $(".tosGuideList svg").css({
                transform: "rotate(0)"
            });

            setTimeout(function () {
                $(parent).css({
                    // height: '210px'
                    height: 'auto'
                })
                $(parent_img).css({
                    transform: "rotate(180deg)"
                });
            }, 100)

        },
        getGuideText(id) {

            const self = this

            self.knowledgeText = ""

            fetch(self.url + "api/v1/app/appknowledge?id=" + id + "&language=zh-CN", {
                method: 'GET',
                headers: {
                    'Accept': 'application/json, text/javascript, */*; q=0.01',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
            }).then((resp) => {
                try {
                    return resp.json();
                } catch (err) {
                }
                return resp.text();

            }).then((res) => {

                self.isFetchKnowing = false

                if (res.message) {
                    self.Toast(res.message, "warn")
                    return
                }

                if (res.data) {

                    if (self.containsHTMLTags(res.data.body)) {
                        //html
                        $(".tosGuideText").html(res.data.body)
                    } else {
                        //md
                        self.knowledgeText = res.data.body
                    }
                }

            }).catch((err) => {
                self.isFetchKnowing = false
                if (err) {
                    $(".tosGuideText").text(err)
                }
            });

        },
        containsHTMLTags(str) {
            var regex = /<\/?[\w\s="/.':;#-\/\?]+>/gi;
            return regex.test(str);
        },
        sendMess(name, data) {
            const self = this;
            const storage = window.localStorage;
            const userInfo = JSON.parse(storage.getItem("userInfo"));

            switch (name) {
                case "syncMode":
                    window.WebViewJavascriptBridge.callHandler(
                        "syncMode"
                        , data
                        , function (res) {
                            if (res != "false") {
                                console.log("syncMode成功");
                            }
                        }
                    )
                    break;
                case "syncNode":
                    window.WebViewJavascriptBridge.callHandler(
                        "syncNode"
                        , data
                        , function (res) {
                            if (res != "false") {
                                console.log("syncNode成功");
                            }
                        }
                    )
                    break;
                case "startProxy":
                    onClickControl('Connect', self.getTunState())
                    break;
                case "stopProxy":
                    onClickControl('Stop', self.getTunState())
                    break;
                case "syncWeb":
                    window.WebViewJavascriptBridge.callHandler(
                        "syncWeb"
                        , data
                        , function (res) {
                            if (res != "false") {
                                //console.log("syncWeb成功");
                            }
                        }
                    )
                    break;
                default:
                    console.log('null');
            }
        },
        startProxy() {

            let self = this
            const storage = window.localStorage;

            self.animateCSS('.Ellipse0', 'scaleAnimate')
            self.animateCSS('.Ellipse1', 'scaleAnimate1')
            self.animateCSS('.Ellipse2', 'scaleAnimate2')
            self.animateCSS('.Ellipse3', 'scaleAnimate3')

            if (self.nodes.length < 1) {
                self.Toast(self.$t('lang.No_line_available'), "warn")
                return
            }

            if (self.isAccountExhausted) {
                self.isShowAccountTrafficExhausted = true
                if (self.isStart) {
                    self.sendMess("stopProxy", { "name": "stopProxy" })
                    self.isStart = false
                    self.Reset()
                }
                return
            }

            if (self.accountExpire != "") {
                if (self.isExpired(self.accountExpire)) {
                    self.isShowAccountExp = true
                    self.isAccountExp = true
                    if (self.isStart) {
                        self.sendMess("stopProxy", { "name": "stopProxy" })
                        self.isStart = false
                        self.Reset()
                    }
                    return;
                } else {
                    self.isShowAccountExp = false
                    self.isAccountExp = false
                }
            }

            if (self.isStarting) {
                return
            }

            if (self.isStart) {
                self.statusText = "disconnecting"
                onClickControl('Stop', self.getTunState())
            } else {
                self.statusText = "connecting"
                onClickControl('Connect', [self.getTunState(), self.isStart])
            }

            self.statusText = "connecting"
            self.isStarting = true


        },
        backLogin() {
            const self = this
            self.isShowForgetSuccess = false
            self.isShowLogin = true
        },
        openWeb(v) {
            const self = this
            var _link = ""
            if (v == "web") {
                _link = self.weblink
                self.animateCSS('.webBtn', 'loginButtonAni')
            } else if (v == "tg") {
                _link = self.tggrouplink
                self.animateCSS('.tgBtn', 'loginButtonAni')
            } else if (v == "tos") {
                _link = self.toslink
                self.animateCSS('.tosBtn', 'loginButtonAni')
            } else if (v == "privacy") {
                _link = self.pplink
                self.animateCSS('.privacyBtn', 'loginButtonAni')
            }

            setTimeout(function () {
                shell.openExternal(_link)
            }, 300)
        },
        nodeSwipe() {
            const self = this
            self.changeMenuItem("nodelist")
        },
        nodeHideSwipe() {
            const self = this
            self.hideMenuIco("nodelist")
        },
        menuSwipe() {
            const self = this
            self.hideMenu()
        },

        showNewsView() {
            const self = this
            self.initNotice()
            self.isShowNews = true
        },
        getCurrentDateTime() {
            const now = new Date();
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, '0'); // 月份从0开始
            const day = String(now.getDate()).padStart(2, '0');
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        },
        setTicketLevel(level) {
            this.ticketLevel = level
        },
        ticketClose(id) {

            const self = this
            const storage = window.localStorage
            const userInfo = JSON.parse(storage.getItem("APP_DATA_USER"));
            var token = ""
            if (userInfo == null) {

            } else {
                token = userInfo.token
            }

            if (self.isTicketCloseing) return
            self.isTicketCloseing = true

            fetch(self.url + "api/v1/app/ticketClose", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/javascript, */*; q=0.01',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                body: "token=" + token + "&id=" + id
            }).then(function (res) {
                self.isTicketCloseing = false
                res.json().then(function (obj) {

                    if (obj) {
                        if (obj.status === 1) {
                            self.getTicket()
                            self.Toast(obj.msg, "success")
                        } else {
                            self.Toast(obj.msg, "warn")
                        }
                    }
                })
            }).catch((err) => {
                self.isTicketCloseing = false
            })

        },
        ticketSave() {

            const self = this
            const storage = window.localStorage
            const userInfo = JSON.parse(storage.getItem("APP_DATA_USER"));
            var token = ""
            if (userInfo == null) {

            } else {
                token = userInfo.token
            }

            if (self.isTicketSaveing) return
            self.isTicketSaveing = true

            if (this.ticketTitle === "") {
                self.Toast(self.$t("lang.invalidTicketTitle"), "warn")
                self.isTicketSaveing = false
                return
            }

            if (this.ticketMessage === "") {
                self.Toast(self.$t("lang.invalidTicketContent"), "warn")
                self.isTicketSaveing = false
                return
            }

            fetch(self.url + "api/v1/app/ticketSave", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/javascript, */*; q=0.01',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                body: "token=" + token + "&level=" + self.ticketLevel + "&subject=" + self.ticketTitle + "&message=" + self.ticketMessage
            }).then(function (res) {
                self.isTicketSaveing = false
                res.json().then(function (obj) {

                    if (obj) {
                        if (obj.status === 1) {
                            self.Toast(obj.msg, "success")
                            self.getTicket()
                            setTimeout(function () {
                                self.ticketLevel = 0
                                self.ticketTitle = ""
                                self.ticketMessage = ""
                                self.isNewTicket = false
                                self.ticketCurrentPage = 1
                            }, 300)
                        } else {
                            self.Toast(obj.msg, "warn")
                        }
                    }
                })
            }).catch((err) => {
                self.isTicketSaveing = false
            })

        },
        sendReply() {
            const self = this
            const storage = window.localStorage
            const userInfo = JSON.parse(storage.getItem("APP_DATA_USER"));
            var token = ""
            if (userInfo == null) {

            } else {
                token = userInfo.token
            }

            if (self.isReplying) return
            self.isReplying = true

            if (this.replyTextContent === "") {
                self.Toast(self.$t("lang.invalidReplyContent"), "warn")
                self.isReplying = false
                return
            }

            if (!this.replyTextContent.trim()) return;

            fetch(self.url + "api/v1/app/ticketReply", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/javascript, */*; q=0.01',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                body: "token=" + token + "&message=" + self.replyTextContent + "&id=" + self.ticketInfo.id
            }).then(function (res) {
                self.isReplying = false
                res.json().then(function (obj) {

                    if (obj) {
                        if (obj.status === 1) {
                            self.replyTextContent = ""
                            self.showTicketInfos(self.ticketInfo)
                            self.Toast(obj.msg, "success")
                        } else {
                            self.Toast(obj.msg, "warn")
                        }
                    }
                })
            }).catch((err) => {
                self.isReplying = false
            })

        },
        showTicketInfos(ticket) {
            const self = this
            self.showTicketInfo = true

            const storage = window.localStorage
            const userInfo = JSON.parse(storage.getItem("APP_DATA_USER"));
            var token = ""
            if (userInfo == null) {

            } else {
                token = userInfo.token
            }

            if (self.showTicketInfoing) return
            self.showTicketInfoing = true

            self.ticketInfo = ticket

            fetch(self.url + "api/v1/app/ticket?token=" + token + "&id=" + ticket.id, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json, text/javascript, */*; q=0.01',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                }
            }).then(function (res) {
                self.showTicketInfoing = false
                res.json().then(function (obj) {
                    if (obj) {

                        self.ticket = obj.data

                        setTimeout(function () {
                            self.$nextTick(() => {
                                const el = self.$refs.messageList;
                                if (el) {
                                    el.scrollTop = el.scrollHeight;
                                }
                            });
                        }, 100)
                    }
                })
            })
                .catch((err) => {
                    self.showTicketInfoing = false
                    console.log(err)
                })

        },
        getTicket() {
            const self = this
            const storage = window.localStorage
            const userInfo = JSON.parse(storage.getItem("APP_DATA_USER"));

            if (self.appVersion !== "2.1.9") {
                return
            }

            var token = ""
            if (userInfo == null) {

            } else {
                token = userInfo.token
            }

            self.isTicket = true

            fetch(self.url + "api/v1/app/ticket?token=" + token, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json, text/javascript, */*; q=0.01',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                }
            }).then(function (res) {
                self.isTicket = false
                res.json().then(function (obj) {
                    if (obj) {
                        self.tickets = obj.data
                    }
                })
            })
                .catch((err) => {
                    self.isTicket = false
                    console.log(err)
                })
        },
        selectWithdrawMethod(item) {
            const self = this
            self.select_withdraw_method = item
        },
        submitTransfer() {
            const self = this
            const storage = window.localStorage
            const userInfo = JSON.parse(storage.getItem("APP_DATA_USER"));
            var token = ""
            if (userInfo == null) {

            } else {
                token = userInfo.token
            }

            if (self.isTransfer) return
            self.isTransfer = true

            if (self.transfer === "") {
                self.Toast(self.$t("lang.invalidTransferAmount"), "warn")
                self.isTransfer = false
                return
            }

            if (self.transfer === 0) {
                self.Toast(self.$t("lang.invalidTransferAmount"), "warn")
                self.isTransfer = false
                return
            }

            fetch(self.url + "api/v1/app/transfer", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/javascript, */*; q=0.01',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                body: "token=" + token + "&transfer_amount=" + self.transfer
            }).then(function (res) {
                self.isTransfer = false
                res.json().then(function (obj) {
                    self.getAppinvite()

                    if (obj.message) {
                        self.Toast(obj.message, "warn")
                        return
                    }

                    if (obj) {
                        if (obj.status === 1) {
                            self.transfer = ""
                            self.Toast(obj.msg, "success")
                        } else {
                            self.Toast(obj.msg, "warn")
                        }
                    }
                })
            }).catch((err) => {
                self.isTransfer = false
            })

        },
        submitWithdraw() {

            const self = this
            const storage = window.localStorage
            const userInfo = JSON.parse(storage.getItem("APP_DATA_USER"));
            var token = ""
            if (userInfo == null) {

            } else {
                token = userInfo.token
            }

            if (self.isWithdraw) return
            self.isWithdraw = true

            if (self.withdrawAccount === "") {
                self.Toast(self.$t("lang.invalidWithdrawalAccount"), "warn")
                self.isWithdraw = false
                return
            }

            fetch(self.url + "api/v1/app/withdraw", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/javascript, */*; q=0.01',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                body: "token=" + token + "&withdraw_account=" + self.withdrawAccount + "&withdraw_method=" + self.select_withdraw_method
            }).then(function (res) {
                self.isWithdraw = false
                res.json().then(function (obj) {
                    self.getAppinvite()
                    if (obj) {
                        if (obj.status === 1) {
                            self.withdrawAccount = ""
                            self.Toast(obj.msg, "success")
                        } else {
                            self.Toast(obj.msg, "warn")
                        }
                    }
                })
            }).catch((err) => {
                self.isWithdraw = false
            })

        },
        async checkAPIEndpoints() {
            const self = this;
            let currentTimestamp = Date.now();

            console.log("🔍 [API检测] 开始检测 API 端点可用性...");
            console.log("🔍 [API检测] 待检测的 API 列表:", self.apiLists);

            if (!self.apiLists || self.apiLists.length === 0) {
                console.warn("⚠️ [API检测] API 列表为空，无法进行检测");
                throw new Error("API 列表为空");
            }

            for (let i = 0; i < self.apiLists.length; i++) {
                const apiUrl = self.apiLists[i];
                console.log(`🔍 [API检测] 正在检测第 ${i + 1}/${self.apiLists.length} 个 API: ${apiUrl}`);

                // 创建 AbortController 实现超时
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 8000) // 减少超时时间到8秒

                try {
                    const testUrl = `${apiUrl}/api/v1/app/config?time=${currentTimestamp}`;
                    console.log(`🔍 [API检测] 测试 URL: ${testUrl}`);

                    const response = await fetch(testUrl, {
                        signal: controller.signal,
                        method: 'GET',
                        headers: {
                            'Accept': 'application/json',
                            'User-Agent': 'SkyNetwork-Client/' + self.appVersion
                        }
                    });

                    clearTimeout(timeoutId); // 请求完成清除超时

                    console.log(`✅ [API检测] ${apiUrl} 响应状态: ${response.status}`);

                    if (response.ok) {
                        const result = await response.json();
                        if (result && result.data) { // 检查是否包含 "data" 字段
                            console.log(`✅ [API检测] ${apiUrl} 检测成功，包含有效数据`);
                            return apiUrl; // 返回找到的接口
                        } else {
                            console.warn(`⚠️ [API检测] ${apiUrl} 响应格式不正确，缺少 data 字段`);
                        }
                    } else {
                        console.warn(`⚠️ [API检测] ${apiUrl} HTTP 错误: ${response.status}`);
                    }
                } catch (error) {
                    clearTimeout(timeoutId); // 确保清除超时

                    if (error.name === 'AbortError') {
                        console.warn(`⏰ [API检测] ${apiUrl} 请求超时 (8秒)`);
                    } else if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
                        console.warn(`🌐 [API检测] ${apiUrl} 网络连接失败，可能是网络问题或服务器不可达`);
                    } else {
                        console.warn(`❌ [API检测] ${apiUrl} 请求失败:`, error.message);
                    }
                }
            }

            //console.error("❌ [API检测] 所有 API 端点检测失败");
            throw new Error("所有 API 端点均不可用，请检查网络连接或稍后重试");
        },
		async fetchAPIContent() {
		  const _0x3e369a = this;
		  let _0x800bcf = Date.now();
		  for (let _0x5ae259 of _0x3e369a.apihost) {
			try {
			  const _0x5da64e = await fetch(_0x5ae259 + "?time=" + _0x800bcf);
			  if (_0x5da64e.ok) {
				const _0x5c66a8 = await _0x5da64e.json();
				_0x3e369a.apiLists = _0x5c66a8.url;
				return _0x5c66a8.url;
			  } else {
				console.warn("请求失败，状态码: " + _0x5da64e.status);
			  }
			} catch (_0x164c05) {
			  console.error("请求错误: " + _0x164c05);
			}
		  }
		  throw new Error("所有请求均失败");
		},
        getTunState() {
            const storage = window.localStorage
            return parseInt(storage.getItem('APP_DATA_TUN'))
        },

        selectNodes(data, n) {

            const self = this
            const storage = window.localStorage

            // 获取clash_group_name，如果没有则使用默认值RULE
            let userInfo = null;
            try {
                const userStr = storage.getItem("APP_DATA_USER");
                if (userStr) {
                    userInfo = JSON.parse(userStr);
                }
            } catch (e) {
                console.error('获取用户信息失败:', e);
            }
            const clashGroupName = (userInfo && userInfo.clash_group_name) ? userInfo.clash_group_name : 'RULE';

            var url = `http://127.0.0.1:9790/proxies/${encodeURIComponent(clashGroupName)}`

            if (self.mode == 0) {
                url = `http://127.0.0.1:9790/proxies/${encodeURIComponent(clashGroupName)}`
            } else {
                url = `http://127.0.0.1:9790/proxies/GLOBAL`
            }

            if (self.isStart) {
                axios
                    .put(url, {
                        name: data.name
                    })
                    .then(res => {
                        console.log("change success")
                    })
                    .catch(e => {
                        //console.log(url, e)
                    })
            }

            storage.setItem('APP_DATA_INDEX', n)
            self.nodeIndex = n
            self.isCurreNodeName = data.name
            self.isCurreNodeFlags = data.flag
            self.nodeInfo = data.info
            self.node = data

            setTimeout(function () {
                self.hideMenuIco('nodelist')
            }, 200)
        },
        formatTime(number, format) {

            function formatNumber(n) {
                n = n.toString()
                return n[1] ? n : '0' + n
            }

            var formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
            var returnArr = [];

            var date = new Date(number * 1000);
            returnArr.push(date.getFullYear());
            returnArr.push(formatNumber(date.getMonth() + 1));
            returnArr.push(formatNumber(date.getDate()));

            returnArr.push(formatNumber(date.getHours()));
            returnArr.push(formatNumber(date.getMinutes()));
            returnArr.push(formatNumber(date.getSeconds()));

            for (var i in returnArr) {
                format = format.replace(formateArr[i], returnArr[i]);
            }
            return format;
        },
        changeTun() {
            const self = this
            const storage = window.localStorage

            // 防止频繁点击
            if (self.isTunChanging) {
                return
            }

            // 设置状态，防止重复点击
            self.isTunChanging = true

            let newTunState = 0
            if (self.tunMode == "testb") {
                self.tunMode = "testa testani"
                storage.setItem('APP_DATA_TUN', 1)
                newTunState = 1
            } else {
                self.tunMode = "testb"
                storage.setItem('APP_DATA_TUN', 0)
                newTunState = 0
            }

            self.isPing = false

            if (self.isStart) {
                // 已连接状态下切换 TUN 模式
                console.log(`切换 TUN 模式: ${newTunState === 1 ? 'TUN 模式' : '非 TUN 模式'}`);

                // 1. 通过 API 更新 TUN 配置
                axios
                    .patch("http://127.0.0.1:9790/configs/", {
                        tun: { enable: newTunState === 1 }
                    })
                    .then(res => {
                        onClickControl('appLog', 'TUN配置已通过API更新');

                        // 2. 根据新的 TUN 状态管理系统代理
                        if (newTunState === 0) {
                            // 切换到非 TUN 模式：启用系统代理
                            console.log('切换到非 TUN 模式：启用系统代理');
                            onClickControl('setSystemProxy', true);
                        } else {
                            // 切换到 TUN 模式：禁用系统代理
                            console.log('切换到 TUN 模式：禁用系统代理');
                            onClickControl('setSystemProxy', false);
                        }

                        // 重置状态
                        setTimeout(() => {
                            self.isTunChanging = false;
                        }, 1000);
                    })
                    .catch(e => {

                        // 即使失败也重置状态
                        setTimeout(() => {
                            self.isTunChanging = false;
                        }, 1000);
                    })
            } else {

                // 重置状态
                setTimeout(() => {
                    self.isTunChanging = false;
                }, 500);
            }
        },
        changeMode(e) {

            const self = this
            const storage = window.localStorage

            //if (e.target.tagName === 'INPUT') return

            let mode = "Rule"

            if (self.globalMode == "testb") {
                self.globalMode = "testa testani"
                self.mode = 1
                mode = "Global"
            } else {
                console.log(1);
                self.globalMode = "testb"
                self.mode = 0
                mode = "Rule"
            }

            if (self.isStart) {
                axios
                    .patch("http://127.0.0.1:9790/configs/", {
                        mode: mode
                    })
                    .then(res => {
                        if (res.status == 204) {
                            self.putProxy()
                        }
                    })
                    .catch(e => {
                        console.log(e)
                    })
            }

            storage.setItem('APP_DATA_MODE', self.mode)
        },
        logout() {

            const self = this;
            const storage = window.localStorage;
            const userInfo = JSON.parse(storage.getItem("APP_DATA_USER"));

            self.hideMenuIco('exit')

            // 重置配置哈希值
            self.lastConfigHash = ""

            if (self.isStart) {
                self.sendMess("stopProxy", { "name": "stopProxy" })
                self.isStart = false
                self.Reset()
            }

            onClickControl('KillCore', self.getTunState())

            storage.removeItem("APP_DATA_USER")
            storage.setItem('APP_DATA_MODE', 0)
            storage.setItem('APP_DATA_INDEX', 0)

            self.tunMode = "testb"
            storage.setItem('APP_DATA_TUN', 0)

            self.nodeIndex = 0
            self.nodes = []
            self.nodesPing = []
            self.nodesAddr = []
            self.isCurreNodeName = "无线路可使用"
            self.isCurreNodePing = 0
            self.isCurreNodeFlags = "static/flags/null.png"

            self.isShowAccount = false
            self.isShowMore = false
            self.accountName = ""
            self.tabIndex = "home"
            self.init();
            self.Toast("退出成功", "success");
        },
        startTimeFunc(isStart) {
            const self = this
            if (self.startTime !== "00:00:00") {
                return
            }

            if (isStart) {
                self.hour = 0;
                self.minute = 0;
                self.second = 0;
                self.startTime = "00:00:00";
                self.timer = setInterval(() => {
                    self.second++;
                    if (self.second >= 60) {
                        self.second = 0;
                        self.minute++;
                    }
                    if (self.minute >= 60) {
                        self.minute = 0;
                        self.hour++;
                    }
                    const _formatTime = (time) => (time < 10 ? "0" + time : time);
                    self.startTime = `${_formatTime(self.hour)}:${_formatTime(self.minute)}:${_formatTime(self.second)}`
                }, 1000);
            } else {
                clearInterval(self.timer);
                self.startTime = "00:00:00";
                self.hour = 0;
                self.minute = 0;
                self.second = 0;
            }
        },
        Reset() {
            // 清除待执行的重启定时器
            if (this.initConfRestartTimer) {
                clearTimeout(this.initConfRestartTimer);
                this.initConfRestartTimer = null;
            }
            // 清除配置hash，下次启动时重新计算
            this.lastConfigHash = "";
            const self = this
            window.clearInterval(self.timer)
            self.startTime = "00:00:00";
            self.hour = 0;
            self.minute = 0;
            self.second = 0;
        },
        update(isStore) {
            const self = this
            const storage = window.localStorage;
            const userInfo = JSON.parse(storage.getItem("APP_DATA_USER"));
            let e = userInfo.email;
            let p = userInfo.passwd;
            let token = userInfo.token;

            function storageObj(obj) {
                var checkedIdStr = JSON.stringify(obj);
                storage.setItem("APP_DATA_USER", checkedIdStr);
                self.setUpdate()
            }

            if (self.isUpdateData) return
            self.isUpdateData = true

            var timestamp = Date.parse(new Date())
            fetch(self.url + "api/v1/app/appsync?time=" + timestamp, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/javascript, */*; q=0.01',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                body: "token=" + token + "&v=" + self.appVersion
            }).then((resp) => {
                try {
                    return resp.json();
                } catch (err) {
                }
                return resp.text();

            }).then((res) => {

                self.isLoging = false
                self.isUpdateData = false

                let timestamp = new Date().getTime();
                localStorage.setItem("lastRefreshTime", timestamp)

                console.log("initUpdate end")

                if (res.status == 1) {

                    const objBefor = {
                        email: res.email,
                        accountID: res.id,
                        expire: res.expired,
                        plan: res.planName,
                        conf: res.conf,
                        link: res.link,
                        residue: res.residue,
                        userTf: res.usedTraffic,
                        tfPercentage: res.tfPercentage,
                        accountdays: res.days,
                        code: res.code,
                        token: res.token,
                        transferEnable: res.transfer_enable,
                        useTf: res.useTf,
                        web: res.web,
                        configs: res.configs,
                        configsNodes: res.configsNodes,
                        chatLink: res.chatLink,
                        clash: res.clash,
                        clash_group_name: res.clash_group_name
                    }

                    if (res.configs != "") {
                        if (res.configs === userInfo.configs) {
                            console.log("No update required");
                            storageObj(objBefor)
                            setTimeout(function () {
                                self.init("login", true)
                                self.setUpdate()
                            }, 500)
                        } else {
                            storageObj(objBefor)
                            console.log("Need to be updated");
                            setTimeout(function () {
                                self.init("sync")
                                self.setUpdate()
                            }, 500)
                        }
                    } else {
                        storageObj(objBefor)
                        console.log("Need to be updated2");
                        setTimeout(function () {
                            self.init("login")
                            self.setUpdate()
                        }, 500)
                    }

                    self.isLoging = false

                } else {
                    if (res.msg) {

                        self.Toast(res.msg, "warn")

                        if (res.msg === "User information error") {
                            self.logout()
                            return
                        }

                    } else {
                        self.Toast(res.reason, "warn")
                    }
                }
            }).catch((err) => {
                self.isUpdateData = false
                self.isLoging = false
            })

        },
        sendEmail() {
            var self = this;
            if (self.isSend) return

            self.animateCSS('.getEmailCode', 'loginButtonAni')

            if (self.signEmail == "") {
                self.Toast(self.$t('lang.emailinputerror'), "warn")
                return
            }
            self.isSend = true
            fetch(self.url + "api/v1/app/appsendEmailVerify", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/javascript, */*; q=0.01',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                body: "email=" + encodeURIComponent(self.signEmail)
            }).then(function (res) {
                self.isSend = false
                res.json().then(function (obj) {
                    if (obj) {
                        if (obj.status == 1) {
                            self.getCode()
                        } else {
                            self.Toast(obj.msg, "warn")
                        }
                    }
                })
            })
        },
        getCode() {
            let self = this
            const TIME_COUNT = 60
            if (!self.newTimer) {
                self.count = TIME_COUNT
                self.show = false
                self.newTimer = setInterval(function () {
                    if (self.count > 0 && self.count <= TIME_COUNT) {
                        self.count--;
                    } else {
                        self.show = true
                        clearInterval(self.newTimer)
                        self.newTimer = null
                    }
                }, 1000)
            }
        },
        getForgetCode() {
            let self = this
            const TIME_COUNT = 60
            if (!self.forgetTimer) {
                self.forgetCount = TIME_COUNT
                self.forgetShow = false
                self.forgetTimer = setInterval(function () {
                    if (self.forgetCount > 0 && self.forgetCount <= TIME_COUNT) {
                        self.forgetCount--;
                    } else {
                        self.forgetShow = true
                        clearInterval(self.forgetTimer)
                        self.forgetTimer = null
                    }
                }, 1000)
            }
        },
        forget() {

            const self = this

            if (self.isForget) return
            self.isForget = true

            self.animateCSS('.forgetBtn', 'loginButtonAni')

            let email = self.forgetEmail;
            let code = self.forgetCode;
            let passwd = self.forgetPasswd;
            let repasswd = self.forgetRePasswd;

            if (email == "") {
                self.Toast(self.$t('lang.emailinputerror'), "warn")
                self.isForget = false
                return
            }

            if (code.length < 6) {
                self.Toast(self.$t("lang.incorrectverificationcodeinput"), "warn")
                self.isForget = false
                return
            }

            if (passwd.length < 8) {
                self.Toast(self.$t("lang.passwordlengtherr"), "warn")
                self.isForget = false
                return
            }

            if (repasswd !== passwd) {
                self.Toast(self.$t("lang.confirmationpassworddoesnotmatchthepassword"), "warn")
                self.isForget = false
                return
            }

            fetch(self.url + "api/v1/app/appforget", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/javascript, */*; q=0.01',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                body: "email=" + encodeURIComponent(email) + "&email_code=" + encodeURIComponent(code) + "&password=" + encodeURIComponent(repasswd)
            }).then(function (res) {
                self.isForget = false
                res.json().then(function (obj) {
                    if (obj) {
                        if (obj.status == 1) {
                            self.isShowForgetSuccess = true
                            self.hideForget()
                            self.forgetEmail = ""
                            self.forgetCode = ""
                            self.forgetPasswd = ""
                            self.forgetRePasswd = ""
                        } else {
                            self.Toast(obj.msg, "warn");
                        }
                    }
                })
            })
        },
        forgetSms() {

            const self = this

            if (self.isSend) return
            self.isSend = true

            self.animateCSS('.newForget .getEmailCode', 'loginButtonAni')

            if (self.forgetEmail == "") {
                self.Toast(self.$t('lang.emailinputerror'), "warn")
                self.isSend = false
                return
            }

            fetch(self.url + "api/v1/app/appsendEmailVerify", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/javascript, */*; q=0.01',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                body: "email=" + encodeURIComponent(self.forgetEmail)
            }).then(function (res) {

                self.isSend = false
                res.json().then(function (obj) {
                    if (obj) {
                        console.log(obj);
                        if (obj.status == 1) {
                            self.getForgetCode()
                        } else {
                            self.Toast(obj.msg, "warn")
                        }
                    }
                })
            })
        },
        register() {
            let self = this

            if (self.isRegistering) {
                return
            }

            self.animateCSS('.registerBtn', 'loginButtonAni')
            self.isRegistering = true

            if (self.signEmail == "") {
                self.Toast(self.$t('lang.emailinputerror'), "warn")
                self.isRegistering = false
                return
            }

            if (self.isEmailVerify) {
                if (self.signCode == "") {
                    self.Toast(self.$t('lang.incorrectverificationcodeinput'), "warn")
                    self.isRegistering = false
                    return
                }
            }

            if (self.signPasswd == "") {
                self.Toast(self.$t('lang.passwordinputerror'), "warn")
                self.isRegistering = false
                return
            }

            if (self.signPasswd.length < 8 || self.signPasswd.length < 8) {
                self.Toast(self.$t('lang.passwordlengtherr'), "warn")
                self.isRegistering = false
                return
            }

            if (self.signRepasswd == "") {
                self.Toast(self.$t('lang.passwordinputerror'), "warn")
                self.isRegistering = false
                return
            }

            if (self.signRepasswd != self.signPasswd) {
                self.Toast(self.$t("lang.confirmationpassworddoesnotmatchthepassword"), "warn")
                self.isRegistering = false
                return
            }

            if (self.isNeedInvite) {
                if (self.signInviteCode == "" || self.signInviteCode == null) {
                    self.Toast(self.$t('lang.invitation_code_was_entered_incorrectly'), "warn")
                    self.isRegistering = false
                    return
                }
            }

            fetch(self.url + "api/v1/app/appregister", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/javascript, */*; q=0.01',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                body: "email=" + encodeURIComponent(self.signEmail) + "&password=" + encodeURIComponent(self.signRepasswd) + "&email_code=" + encodeURIComponent(self.signCode) + "&invite_code=" + encodeURIComponent(self.signInviteCode)
            }).then((resp) => {
                try {
                    return resp.json();
                } catch (err) {
                }
                return resp.text();

            }).then((res) => {

                self.isRegistering = false

                if (res.status == 1) {
                    self.showSign = false
                    self.isShowSuccessText = "账户注册完成"
                    self.isRegistering = false
                    self.isShowSuccess = true
                } else {
                    self.Toast(res.msg, "warn");
                    self.isRegistering = false
                }

            }).catch((err) => {
                self.isRegistering = false
            });
        },
        backNodelist() {
            const self = this
            self.isShownodeList = false
        },
        backNews() {
            const self = this
            self.isShowNews = false
        },
        backAbout() {
            const self = this
            self.isShowAbout = false
        },
        backPreferences() {
            const self = this
            self.isShowPreferences = false
            self.animateCSS('.langCard', 'loginButtonAni')
            self.langsHeight = 60
            self.colorsHeight = 60
        },
        backKnow() {
            const self = this
            self.isShowknowledge = false
            $(".tosGuideList").css({
                height: '55px'
            })
            $(".tosGuideList svg").css({
                transform: "rotate(0)"
            });
            self.isShow = ""
        },
        hideMenuIco(n) {
            const self = this

            switch (n) {
                case 'ticketInfo':
                    if (self.appVersion !== "2.1.9") {
                        return
                    }
                    self.showTicketInfo = false
                    break
                case 'ticket':
                    if (self.appVersion !== "2.1.9") {
                        return
                    }
                    self.showTicket = false
                    break
                //2.1.3
                case 'orders':
                    self.isOrderRecords = false
                    self.currentPage = 1
                    break
                case 'invite':
                    self.showAccountInvite = false
                    self.currentPage = 1
                    break
                case 'profile':
                    self.isShowprofileList = ""
                    break;
                case 'about':
                    self.isShowAbout = false
                    break;
                case 'tos':
                    self.isShowTos = ""
                    break;
                case 'news':
                    self.isShowNews = false
                    break;
                case 'knowledge':
                    self.isShowknowledge = false
                    $(".tosGuideList").css({
                        height: '55px'
                    })
                    $(".tosGuideList svg").css({
                        transform: "rotate(0)"
                    });
                    self.isShow = ""
                    break;
                case 'privacy':
                    self.isShowPrivacy = ""
                    break;
                case 'nodelist':
                    self.isShownodeList = false
                    self.isPing = false
                    break;
                case 'store':
                    self.isShowStore = ""
                    break;
                case 'exit':
                    self.isShownewExit = false
                    break;
                default:
                    console.log(1);
            }
        },
        hideMenu() {
            const self = this
            self.isShowMenuRight = ""
            setTimeout(function () {
                self.isShowMenu = ""
            }, 100)
        },
        showMenu() {
            const self = this
            self.isShowMenu = "newshowLeftMenu"
            setTimeout(function () {
                self.isShowMenuRight = "testani2"
            }, 300)
        },
        isTimestampExpired(timestamp, minutes) {
            var currentTime = new Date().getTime();
            var difference = currentTime - timestamp;
            var minutesDifference = Math.floor(difference / 1000 / 60);
            return minutesDifference > minutes;
        },
        changeTab(TAB) {

            const self = this
            switch (TAB) {
                case 'home':
                    self.isShowknowledge = false
                    self.isShowPreferences = false
                    self.isNetwork_proxy_settings = false
                    self.isShowAbout = false
                    self.isStore = false
                    self.showAccountInvite = false
                    self.isShowPlanInfo = false
                    self.isOrderRecords = false
                    self.tabIndex = "home"
                    self.isShowAccount = false
                    self.isShowMore = false
                    self.showTicket = false
                    self.showTicketInfo = false
                    self.isShowHome = true
                    self.setUpdate()
                    break
                case 'account':
                    self.isShowNews = false
                    self.isShowknowledge = false
                    self.isShowPreferences = false
                    self.isNetwork_proxy_settings = false
                    self.isShowAbout = false
                    self.isShownodeList = false
                    self.tabIndex = "account"
                    self.isShowHome = false
                    self.isShowMore = false
                    self.isShowAccount = true
                    self.setUpdate()

                    if (!self.isUpdateData) {
                        self.update()
                        self.initConfig()
                    }

                    //self.lastRefreshTime = localStorage.getItem("lastRefreshTime")

                    // if (self.lastRefreshTime == null || self.lastRefreshTime === "") {
                    //
                    //     self.testMsg = "lastRefreshTime NULL "
                    //
                    //     if (!self.isUpdateData) {
                    //         self.update()
                    //         self.initConfig()
                    //     }
                    //
                    // } else {
                    //
                    //     var isExpired = self.isTimestampExpired(parseInt(self.lastRefreshTime), 1);
                    //     if (isExpired) {
                    //
                    //         self.testMsg = "lastRefreshTime 超过2分钟:"
                    //
                    //         if (!self.isUpdateData) {
                    //             self.update()
                    //             self.initConfig()
                    //         }
                    //     } else {
                    //
                    //         self.testMsg = "lastRefreshTime 未超过2分钟"
                    //
                    //         console.log("less than 2m");
                    //     }
                    // }


                    if (self.accountExpire != "") {
                        if (self.isExpired(self.accountExpire)) {
                            self.isShowAccountExp = true
                            self.isAccountExp = true

                            if (self.isStart) {
                                self.sendMess("stopProxy", { "name": "stopProxy" })
                                self.isStart = false
                                self.Reset()
                            }

                        } else {
                            self.isShowAccountExp = false
                            self.isAccountExp = false
                        }
                    }

                    break
                case 'more':
                    self.isShowNews = false
                    self.isStore = false
                    self.showAccountInvite = false
                    self.isOrderRecords = false
                    self.isShowPlanInfo = false
                    self.isShownodeList = false
                    self.tabIndex = "more"
                    self.isShowHome = false
                    self.isShowAccount = false
                    self.showTicket = false
                    self.showTicketInfo = false
                    self.isShowMore = true
                    break
                default:
                    console.log("");
            }
        },
        changeMenuItem(n) {

            const self = this

            const storage = window.localStorage;
            const userInfo = JSON.parse(storage.getItem("APP_DATA_USER"));

            if (n === "store") {
                self.getPaymentMethod()
                self.getAppPlans()
                self.isAppAlert = false
                self.isShowAccountExp = false
                self.isShowAccountTrafficExhausted = false
                self.isStore = true
                //self.goStore()
            } else {
                self.hideMenu()
            }

            switch (n) {
                case 'chat':

                    self.animateCSS(".chatBtn", "loginButtonAni")

                    if (self.chatType == "" || self.chatType == null) {
                        self.Toast(self.$t('lang.Not_configured_for_online_customer_service'), "warn")
                        return
                    }

                    if (self.chatType === "crisp") {

                        if (!self.isCrisp) {
                            self.Toast("Crisp客服系统加载中", "warn")
                            return;
                        }

                        $crisp.push(["do", "chat:open"])
                        $crisp.push(["do", "chat:show"])

                        $(".crisp-client").removeClass("isHide")

                        setTimeout(function () {
                            $("#crisp-chatbox").attr("data-full-view", "true");
                            $($("#crisp-chatbox").get(0).firstChild.firstChild).css({
                                width: ""
                            })
                            $($("#crisp-chatbox").get(0).firstChild.firstChild.nextSibling).remove()
                        }, 100)

                        return
                    }

                    if (self.chatLink === "" || self.chatLink == null) {
                        self.Toast(self.$t('lang.Not_configured_for_online_customer_service'), "warn")
                        return
                    }

                    //let _chatlink = self.chatLink + '?plan=' + self.accountPlan +"&expire="+self.accountExpire +"&usetraffic=" +self.accountUserTf +"&alltraffic=" + self.accountBandwidth
                    //add

                    let showLoadingText = ""
                    self.isAlert = true
                    self.isWebStore = true
                    self.isShowLoading = true
                    self.storeLink = self.chatLink

                    setTimeout(function () {

                        self.isAlert = false
                        self.isShowLoading = false

                        const webview = document.getElementById("storeWeb")

                        const loadstart = () => {
                            console.log("view loading");
                            if (showLoadingText == "") {
                                self.isShowLoading = true
                                showLoadingText = "loading"
                            }
                        }

                        const loadstop = () => {
                            self.isAlert = false
                            self.isShowLoading = false
                            console.log("view show");
                            webview.insertCSS('html::-webkit-scrollbar{ display: none !important; };');
                            // webview.insertCSS('header { display: none !important; };');
                        }

                        webview.addEventListener('did-start-loading', loadstart);
                        webview.addEventListener('did-stop-loading', loadstop);

                    }, 3000)

                    break
                case 'ticket':
                    if (self.appVersion !== "2.1.9") {
                        return
                    }
                    self.showTicket = true
                    self.getTicket()
                    break
                //2.1.3
                case 'theme':
                    self.isShowPreferences = true
                    setTimeout(function () {
                        HSThemeSwitch.autoInit()
                    }, 100)
                    break
                case 'orders':
                    self.isOrderRecords = true
                    self.getOrders()
                    break
                case 'update':
                    if (self.isUpdateData) return
                    self.update()
                    break
                case 'profile':
                    self.isShowprofileList = "showprofileList";
                    self.isShowAbout = false;
                    self.isShowTos = "";
                    self.isShowNews = "";
                    self.isShowknowledge = false;
                    self.isShownodeList = false;
                    self.isShowPrivacy = "";
                    self.isShowStore = "";
                    self.isShownewExit = false;
                    break;
                case 'about':
                    self.isShowAbout = true;
                    self.isShowNews = "";
                    self.isShowknowledge = false;
                    self.isShowprofileList = "";
                    self.isShowTos = "";
                    self.isShownodeList = false;
                    self.isShowPrivacy = "";
                    self.isShowStore = "";
                    self.isShownewExit = false;
                    break;
                case 'tos':
                    self.isShowTos = "showprofileList";
                    break;
                case 'news':
                    self.isShowNews = "showprofileList";
                    self.isShowknowledge = false;
                    self.isShowprofileList = "";
                    self.isShowAbout = false;
                    self.isShowTos = "";
                    self.isShownodeList = false;
                    self.isShowPrivacy = "";
                    self.isShowStore = "";
                    self.isShownewExit = false;
                    break;
                case 'knowledge':
                    // self.isShowNews = ""
                    //self.animateCSS("knowledgeBtn", "loginButtonAni")
                    self.isShowknowledge = true
                    // self.isShowprofileList = ""
                    // self.isShowAbout = ""
                    // self.isShowTos = ""
                    // self.isShownodeList = ""
                    // self.isShowPrivacy = ""
                    // self.isShowStore = ""
                    self.isShownewExit = false
                    if (userInfo) {
                        self.initSupportFile()
                    }
                    break;
                case 'nodelist':
                    self.isShownodeList = true;
                    self.isShowAbout = false;
                    self.isShowNews = "";
                    self.isShowknowledge = false;
                    self.isShowprofileList = "";
                    self.isShowTos = "";
                    self.isShowPrivacy = "";
                    self.isShowStore = "";
                    self.isShownewExit = false
                    //self.nodesTcpPing()
                    break;
                case 'privacy':
                    self.isShowPrivacy = "showprofileList";
                    break;
                case 'exit':
                    self.isShownewExit = true;
                    self.isShowAbout = false;
                    self.isShowNews = "";
                    self.isShowknowledge = false;
                    self.isShowprofileList = "";
                    self.isShowTos = "";
                    self.isShownodeList = false;
                    self.isShowPrivacy = "";
                    self.isShowStore = "";
                    break;
                case 'restore':
                    break;
                default:
                    console.log(1);
            }
        },
        goStore() {
            const self = this
            self.isAlert = true

            const storage = window.localStorage;
            const userInfo = JSON.parse(storage.getItem("APP_DATA_USER"));
            let e = userInfo.email;
            let p = userInfo.passwd;

            let showLoadingText = ""

            if (self.panelType == "sspanel") {

                self.isWebStore = true

                self.isShowLoading = true
                self.storeLink = self.weburl + "api/v1/app/apptoken?email=" + e + "&password=" + p

                console.log(self.storeLink);



                setTimeout(function () {
                    self.isAlert = false

                    const webview = document.getElementById("storeWeb")

                    const loadstart = () => {
                        console.log("view loading");
                        if (showLoadingText == "") {
                            self.isShowLoading = true
                            showLoadingText = "loading"
                        }
                    }

                    const loadstop = () => {
                        self.isAlert = false
                        self.isShowLoading = false
                        console.log("view show");
                        webview.insertCSS('html::-webkit-scrollbar{ display: none !important; };');
                        webview.insertCSS('header { display: none !important; };');
                    }

                    webview.addEventListener('did-start-loading', loadstart);
                    webview.addEventListener('did-stop-loading', loadstop);

                }, 3000)

                return
            }

            fetch(self.url + "api/v1/app/getTempToken", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/javascript, */*; q=0.01',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                body: "token=" + self.user.token
            }).then(function (res) {
                res.json().then(function (obj) {
                    self.isAlert = false
                    self.isWebStore = true

                    if (obj.data) {

                        self.storeLink = self.url + "api/v1/app/homepage?token=" + obj.data + "&redirect=plan"

                        const webview = document.getElementById("storeWeb")
                        //const indicator = document.querySelector('.indicator')

                        const loadstart = () => {
                            console.log("view loading");
                            if (showLoadingText == "") {
                                self.isShowLoading = true
                                showLoadingText = "loading"
                            }
                        }

                        const loadstop = () => {
                            self.isAlert = false
                            self.isShowLoading = false
                            console.log("view show");
                            webview.insertCSS('html::-webkit-scrollbar{ display: none !important; };');
                            webview.insertCSS('header { display: none !important; };');
                        }

                        setTimeout(function () {
                            webview.addEventListener('did-start-loading', loadstart);
                            webview.addEventListener('did-stop-loading', loadstop);
                        }, 500)

                    }
                })
            })
        },
        showpass(t) {
            const self = this
            if (t == "show") {
                self.isShowPass = true;
                self.passtype = "text";
            } else {
                self.isShowPass = false;
                self.passtype = "password";
            }
        },
        login() {

            const self = this
            const storage = window.localStorage;

            function storageObj(obj) {
                var checkedIdStr = JSON.stringify(obj);
                storage.setItem("APP_DATA_USER", checkedIdStr);
                self.setUpdate()
            }

            self.animateCSS('.loginformBtn', 'loginButtonAni')

            if (self.isLoging) {
                return
            }

            self.isLoging = true;

            if (self.loginEmail == "" || self.loginEmail == null) {
                self.Toast(self.$t('lang.emailinputerror'), "warn")
                self.isLoging = false
                return
            }

            if (self.loginPasswd == "" || self.loginPasswd == null) {
                self.Toast(self.$t('lang.passwordinputerror'), "warn")
                self.isLoging = false
                return
            }

            if (self.loginPasswd.length < 8) {
                self.Toast(self.$t('lang.passwordinputerror'), "warn")
                self.isLoging = false
                return
            }

            var timestamp = Date.parse(new Date())
            fetch(self.url + "api/v1/app/applogin?time=" + timestamp, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/javascript, */*; q=0.01',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                body: "email=" + encodeURIComponent(self.loginEmail) + "&password=" + encodeURIComponent(self.loginPasswd) + "&v=" + self.appVersion
            }).then((resp) => {
                try {
                    return resp.json();
                } catch (err) {
                }
                return resp.text();

            }).then((res) => {
                self.isLoging = false

                if (res.status == 1) {

                    const objBefor = {
                        email: self.loginEmail,
                        passwd: self.loginPasswd,
                        accountID: res.id,
                        expire: res.expired,
                        plan: res.planName,
                        conf: res.conf,
                        link: res.link,
                        residue: res.residue,
                        userTf: res.usedTraffic,
                        tfPercentage: res.tfPercentage,
                        accountdays: res.days,
                        code: res.code,
                        token: res.token,
                        transferEnable: res.transfer_enable,
                        useTf: res.useTf,
                        web: res.web,
                        configs: res.configs,
                        configsNodes: res.configsNodes,
                        chatLink: res.chatLink,
                        clash: res.clash,
                        clash_group_name: res.clash_group_name
                    }

                    storageObj(objBefor)

                    self.init("login")
                    self.Toast("登录成功", "success")
                    self.isLoging = false
                } else {
                    if (res.msg) {
                        self.Toast(res.msg, "warn");
                    } else {
                        self.Toast(res.reason, "warn");
                    }
                    self.isLoging = false
                }
            }).catch((err) => {
                self.isLoging = false
            });
        },
        hideSuccessPage() {
            const self = this
            self.goLogin()
            self.isShowLogin = true
            self.isShowSuccess = false
        },
        goForget() {
            const self = this
            self.isShowLogin = false
            self.isShowForget = true
            //signForgotLink
            // self.sendMess("syncDown", {"name": "syncDown", "url": self.signForgotLink})

            setTimeout(function () {
                HSStrongPassword.autoInit()
            }, 100)

        },
        hideForget() {
            const self = this
            self.isShowForget = false
            self.isShowLogin = true
        },
        goSign() {
            const self = this
            self.isShowLogin = false
            self.showSign = true
            //self.sendMess("syncDown", {"name": "syncDown", "url": self.signForgotLink})
            self.isShowLogin = true
            setTimeout(function () {
                HSStrongPassword.autoInit()
            }, 100)
        },
        goLogin() {
            const self = this
            self.showSign = false
        },
        Toast(text, type) {
            let self = this;
            self.isShowToast = true;
            self.ToastText = text;
            self.ToastType = type;
            setTimeout(function () {
                self.isShowToast = false;
            }, 2000)
        },
        // 手动重试 API 连接
        retryApiConnection() {
            const self = this;
            console.log("🔄 [手动重试] 用户手动重试 API 连接");

            // 清除缓存的 API 地址，强制重新获取
            const storage = window.localStorage;
            storage.removeItem("APP_API_URL");

            // 重新初始化 API 连接
            self.initFetch();
        }
    }
}

const i18n = new VueI18n({
    messages: languagepack
})

var Ctor = Vue.extend(Main)
new Ctor({ i18n }).$mount('#app')