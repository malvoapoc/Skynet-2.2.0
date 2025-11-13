const remote = require("electron").remote;
const {
  shell,
  app
} = require("electron");
const ipc = require("electron").ipcRenderer;
const currentWindow = remote.getCurrentWindow();
const path = require("path");
function onClickControl(_0x2cc520, _0x4e0675) {
  ipc.send("onClickControl", _0x2cc520, _0x4e0675);
}
const fs = require("fs");
const util = require("util");
const tcping = util.promisify(require("tcp-ping").ping);
const net = require("net");
Vue.directive("remove-spaces", {
  bind(_0x4ea8b9) {
    const _0x5921f3 = () => {
      const _0x309e0e = _0x4ea8b9.value.replace(/\s/g, "");
      if (_0x309e0e !== _0x4ea8b9.value) {
        _0x4ea8b9.value = _0x309e0e;
        _0x4ea8b9.dispatchEvent(new Event("input"));
      }
    };
    _0x4ea8b9.addEventListener("input", _0x5921f3);
  }
});
const languagepack = {
  en: {
    lang: {
      lang: "English",
      email: "Email",
      password: "Password",
      confirmpassword: "Confirm Password",
      forgotpassword: "Forgot password?",
      login: "Login",
      nohaveanaccount: "Don't have an account?",
      register: "Register",
      loggingin: "Logging in",
      resetpassword: "Reset Password",
      emailverificationcode: "Email verification code",
      invitationcode: "Invitation code",
      Invitationcodeoptional: "Invitation code (optional)",
      send: "Send",
      requesting: "Requesting",
      emailinputerror: "Incorrect email input",
      passwordinputerror: "Incorrect password input",
      couponinputerror: "Coupon input error",
      incorrectverificationcodeinput: "Incorrect verification code input",
      passwordlengtherr: "Password must be greater than 8 digits",
      confirmationpassworddoesnotmatchthepassword: "Confirmation password does not match the password",
      signup: "Sign up",
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
      Data_Overview: "Data Overview",
      My_Invitation: "My Invitation",
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
      TUN_Mode: "TUN Mode",
      View: "View",
      Current_Package: "Current Package",
      Connections: "Connect",
      My: "My",
      Getting_Ethernet: "Getting Ethernet",
      Configuring_Ethernet: "Configuring Ethernet",
      Starting_Ethernet: "Starting Ethernet"
    }
  },
  cn: {
    lang: {
      lang: "中文",
      email: "邮箱",
      password: "密码",
      confirmpassword: "确认密码",
      forgotpassword: "忘记密码?",
      login: "登录",
      nohaveanaccount: "没有账号?",
      register: "注册账号",
      loggingin: "正在登入",
      resetpassword: "重置密码",
      emailverificationcode: "邮箱验证码",
      invitationcode: "邀请码",
      Invitationcodeoptional: "邀请码(选填)",
      send: "发送",
      requesting: "Requesting",
      emailinputerror: "邮箱输入错误",
      couponinputerror: "优惠券输入错误",
      passwordinputerror: "密码输入错误",
      incorrectverificationcodeinput: "验证码输入不正确",
      passwordlengtherr: "密码长度需大于八位数",
      confirmationpassworddoesnotmatchthepassword: "确认密码与密码不符",
      signup: "注册账号",
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
      Select_your_preferred_display_theme: "选择您喜欢的显示主题",
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
      Data_Overview: "数据概览",
      My_Invitation: "我的邀请",
      Commission_Record: "佣金记录",
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
      TUN_Mode: "网卡模式",
      View: "查看",
      Current_Package: "当前套餐",
      Connections: "连接",
      My: "我的",
      Getting_Ethernet: "获取网卡中",
      Configuring_Ethernet: "正在配置网卡",
      Starting_Ethernet: "正在启动网卡"
    }
  },
  hk: {
    lang: {
      lang: "繁體中文",
      email: "郵箱",
      password: "密碼",
      confirmpassword: "確認密碼",
      forgotpassword: "忘記密碼?",
      login: "登錄",
      nohaveanaccount: "沒有帳號?",
      register: "註冊帳號",
      loggingin: "正在登入",
      resetpassword: "重置密碼",
      emailverificationcode: "郵箱驗證碼",
      invitationcode: "邀請碼",
      Invitationcodeoptional: "邀請碼(選填)",
      send: "發送",
      requesting: "Requesting",
      emailinputerror: "郵箱輸入錯誤",
      couponinputerror: "優惠券輸入錯誤",
      passwordinputerror: "密碼輸入錯誤",
      incorrectverificationcodeinput: "驗證碼輸入錯誤",
      passwordlengtherr: "密碼長度需大於7位數",
      confirmationpassworddoesnotmatchthepassword: "確認密碼與密碼不符",
      signup: "註冊帳號",
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
      Select_your_preferred_display_theme: "選擇您喜歡的顯示主題",
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
      Data_Overview: "數據概覽",
      My_Invitation: "我的邀請",
      Commission_Record: "佣金記錄",
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
      TUN_Mode: "網卡模式",
      View: "查閱",
      Current_Package: "當前套餐",
      Connections: "連接",
      My: "我的",
      Getting_Ethernet: "正在獲取網卡",
      Configuring_Ethernet: "正在配置網卡",
      Starting_Ethernet: "正在啟動網卡"
    }
  },
  vn: {
    lang: {
      lang: "Tiếng Việt",
      email: "E-mail",
      password: "Mật khẩu",
      confirmpassword: "Xác nhận mật khẩu",
      forgotpassword: "Quên mật khẩu?",
      login: "Đăng nhập",
      nohaveanaccount: "Không có tài khoản?",
      register: "Đăng ký",
      loggingin: "Đăng nhập..",
      resetpassword: "Đặt Lại Mật Khẩu",
      emailverificationcode: "Mã xác minh mail",
      invitationcode: "Mã mời",
      Invitationcodeoptional: "Mã mời (tùy chọn)",
      send: "Gửi",
      requesting: "yêu cầu..",
      emailinputerror: "Lỗi nhập email",
      couponinputerror: "Lỗi nhập phiếu giảm giá",
      passwordinputerror: "mật khẩu không đúng",
      incorrectverificationcodeinput: "Mã xác minh không chính xác",
      passwordlengtherr: "Mật khẩu phải lớn hơn 8 chữ số",
      confirmationpassworddoesnotmatchthepassword: "Xác nhận mật khẩu không khớp với mật khẩu",
      signup: "Đăng ký tài khoản",
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
      AutoSelect: "Tự động lựa chọn",
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
      piece: "mục hoặc phần (tùy ngữ cảnh)",
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
      TUN_Mode: "Chế độ TUN",
      View: "Xem",
      Current_Package: "Gói hiện tại",
      Connections: "Kết nối",
      My: "Của tôi",
      Getting_Ethernet: "Đang lấy Ethernet",
      Configuring_Ethernet: "Đang cấu hình Ethernet",
      Starting_Ethernet: "Đang khởi động Ethernet"
    }
  },
  fa: {
    lang: {
      lang: "فارسی",
      email: "ایمیل",
      password: "کلمه عبور",
      confirmpassword: "تایید کلمه عبور",
      forgotpassword: "کلمه عبور را فراموش کرده اید؟",
      login: "ورود",
      nohaveanaccount: "ثبت نام حساب کاربری؟",
      register: "ثبت نام",
      loggingin: "ورود",
      resetpassword: "بازیابی کلمه عبور",
      emailverificationcode: "کد تایید ایمیل",
      invitationcode: "کد دعوت",
      Invitationcodeoptional: "کد دعوت (اختیاری)",
      send: "ارسال",
      requesting: "در حال ارسال درخواست",
      emailinputerror: "ایمیل نادرست است",
      couponinputerror: "هنگام وارد کردن کوپن خطایی روی داد",
      passwordinputerror: "کلمه عبور نادرست است",
      incorrectverificationcodeinput: "کد تایید نادرست است",
      passwordlengtherr: "کلمه عبور حداقل 8 کاراکتر باشد",
      confirmationpassworddoesnotmatchthepassword: "تایید کلمه عبور یکسان نیست",
      signup: "ثبت نام",
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
      Select_your_preferred_display_theme: "زمینه نمایش دلخواه خود را انتخاب کنید",
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
      TUN_Mode: "حالت TUN",
      View: "مشاهده",
      Current_Package: "بسته فعلی",
      Connections: "اتصالات",
      My: "من",
      Getting_Ethernet: "در حال دریافت کارت شبکه",
      Configuring_Ethernet: "در حال پیکربندی کارت شبکه",
      Starting_Ethernet: "در حال راه‌اندازی کارت شبکه"
    }
  }
};
var Main = {
  data() {
    return {
      panelType: "v2board",
      appVersion: "2.1.7",
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
      signEmailSelect: "gmail.com",
      emailList: ["gmail.com", "qq.com", "outlook.com", "163.com", "126.com", "yeah.net", "foxmail.com", "sina.com", "icloud.com"],
      isShowSuccess: false,
      isShowForgetSuccess: false,
      isShowSuccessText: "账户注册完成",
      isShowForget: false,
      url: "",
      weburl: "",
      urls: "",
      tabIndex: "home",
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
      languages: [{
        name: "English",
        code: "en"
      }, {
        name: "中文",
        code: "cn"
      }, {
        name: "繁體中文",
        code: "hk"
      }, {
        name: "Tiếng Việt",
        code: "vn"
      }, {
        name: "فارسی",
        code: "fa"
      }],
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
      themes: [{
        name: "Default",
        hex: "#0074FF"
      }, {
        name: "Rose",
        hex: "#e11d48"
      }, {
        name: "Pink",
        hex: "#db2777"
      }, {
        name: "Purple",
        hex: "#9333ea"
      }, {
        name: "Indigo",
        hex: "#4f46e5"
      }, {
        name: "Blue",
        hex: "#2563eb"
      }, {
        name: "Cyan",
        hex: "#0891b2"
      }, {
        name: "Emerald",
        hex: "#059669"
      }, {
        name: "Green",
        hex: "#16a34a"
      }, {
        name: "Orange",
        hex: "#ea580c"
      }, {
        name: "Red",
        hex: "#dc2626"
      }, {
        name: "Neutral",
        hex: "#525252"
      }, {
        name: "Yellow",
        hex: "#facc15"
      }],
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
      apihost: ["https://sky.c-box.cc/oss/host.php"],
      apiLists: [],
      currentPage: 1,
      pageSize: 5,
      isFetchOrdersing: false,
      searchTerm: "",
      orders: [],
      invite_code: "",
      invite_codes: "",
      inviteUrl: "",
      invite_commission_balance: 0,
      invite_commission_rate: 0,
      invite_get_amount: 0,
      invite_uncheck_commission_balance: 0,
      invite_users: 0,
      invitedetails: [],
      pageSizeOptions: [10, 20, 50],
      isOrderRecords: false,
      isGenerateing: false,
      isGenerateIngviteing: false,
      isFetchKnowing: false,
      isDarkorLight: "",
      updateMsg: "",
      updateContextArr: "",
      isAppAlert: false,
      isNetwork_proxy_settings: false,
      AppAlertMessage: "",
      AppAlertTitle: "",
      AppAlertImg: "",
      AppAlertTags: [],
      classesList: ["bg-blue-100 text-blue-800", "bg-green-100 text-green-800", "bg-purple-100 text-purple-800", "bg-yellow-100 text-yellow-800", "bg-pink-100 text-pink-800"],
      tagClasses: [],
      v2bKeysToConsider: ["month_price", "quarter_price", "half_year_price", "year_price", "two_year_price", "three_year_price", "onetime_price", "reset_price"],
      xbKeysToConsider: ["monthly", "quarterly", "half_yearly", "yearly", "two_yearly", "three_yearly", "onetime", "reset_traffic"],
      tunJson: {
        address: ["172.19.0.1/30", "fdfe:dcba:9876::1/126"],
        auto_route: true,
        endpoint_independent_nat: true,
        sniff: true,
        sniff_override_destination: true,
        stack: "system",
        strict_route: true,
        type: "tun"
      }
    };
  },
  watch: {
    apptheme(_0x194b4c) {
      document.documentElement.style.setProperty("--app-theme-color", _0x194b4c);
    }
  },
  computed: {
    compiledMarkdown: function () {
      return marked(this.knowledgeText, {
        sanitize: true
      });
    },
    filteredOrders() {
      const _0x4a6c77 = (this.searchTerm || "").toLowerCase();
      if (!_0x4a6c77) {
        return this.orders;
      }
      return this.orders.filter(_0xec8fc3 => {
        const _0x5a6b45 = [_0xec8fc3.id, _0xec8fc3.period, _0xec8fc3.status, _0xec8fc3.updated_at, _0xec8fc3.total_amount];
        return _0x5a6b45.some(_0x51239e => String(_0x51239e || "").toLowerCase().includes(_0x4a6c77));
      });
    },
    totalPages() {
      return Math.ceil(this.filteredOrders.length / this.pageSize);
    },
    inviterTotalPages() {
      return Math.ceil(this.invitedetails.length / this.pageSize);
    },
    paginatedOrders() {
      const _0x19fbcb = (this.currentPage - 1) * this.pageSize;
      const _0x1625f0 = _0x19fbcb + this.pageSize;
      return this.filteredOrders.slice(_0x19fbcb, _0x1625f0);
    },
    paginatedInviterData() {
      const _0x5ba9f1 = (this.currentPage - 1) * this.pageSize;
      const _0x4f9b40 = _0x5ba9f1 + this.pageSize;
      return this.invitedetails.slice(_0x5ba9f1, _0x4f9b40);
    }
  },
  created() {
    let _0x4b0a8c = this;
    const _0x597ebb = window.localStorage;
    const _0xe39ebf = _0x597ebb.getItem("APP_API_URL");
    if (_0x597ebb.getItem("APP_THEME") == null) {
      _0x4b0a8c.apptheme = "#0074FF";
      _0x597ebb.setItem("APP_THEME", _0x4b0a8c.apptheme);
    } else {
      _0x4b0a8c.apptheme = _0x597ebb.getItem("APP_THEME");
    }
    if (_0x597ebb.getItem("APP_DATA_TUN") == null) {
      _0x4b0a8c.tunMode = "testb";
      _0x597ebb.setItem("APP_DATA_TUN", 0);
    } else if (_0x597ebb.getItem("APP_DATA_TUN") == 1) {
      _0x4b0a8c.tunMode = "testa testani";
    } else {
      _0x4b0a8c.tunMode = "testb";
    }
    if (_0xe39ebf == null) {
      console.log("api null");
      _0x4b0a8c.initFetch();
    } else {
      _0x4b0a8c.url = _0xe39ebf;
      _0x4b0a8c.initApp();
      console.log("api " + _0xe39ebf);
    }
    _0x4b0a8c.updateTheme();
    HSThemeSwitch.autoInit();
    setTimeout(function () {
      $(".initDom").addClass("isHide");
      _0x4b0a8c.initConf();
    }, 2000);
  },
  mounted() {
    const _0x23c2e4 = this;
    const _0x32f6dc = window.localStorage;
    const _0x4b36b7 = JSON.parse(_0x32f6dc.getItem("APP_DATA_USER"));
    $(document).on("click", "a[href^=\"http\"]", function (_0x376c8) {
      console.log(_0x376c8.target);
      _0x376c8.preventDefault();
    });
    $(document).on("click", function () {
      _0x23c2e4.isActiveMore = false;
      _0x23c2e4.isActiveLang = false;
    });
    if (_0x32f6dc.getItem("APP_LANG") == null) {
      let _0x370643 = navigator.language.toLowerCase();
      var _0x593c5a = _0x370643.includes("zh");
      var _0x4832a9 = _0x370643.includes("vi");
      var _0x447af8 = _0x370643.includes("fa");
      var _0x3171da = _0x370643.includes("hk");
      var _0x24012a = _0x370643.includes("tw");
      if (_0x3171da) {
        _0x23c2e4.$i18n.locale = "hk";
      } else if (_0x24012a) {
        _0x23c2e4.$i18n.locale = "hk";
      } else if (_0x593c5a) {
        _0x23c2e4.$i18n.locale = "cn";
      } else if (_0x4832a9) {
        _0x23c2e4.$i18n.locale = "vn";
      } else if (_0x447af8) {
        _0x23c2e4.$i18n.locale = "fa";
      } else {
        _0x23c2e4.$i18n.locale = "en";
      }
      _0x23c2e4.language = _0x23c2e4.$i18n.locale;
    } else {
      _0x23c2e4.language = _0x32f6dc.getItem("APP_LANG");
      _0x23c2e4.$i18n.locale = _0x23c2e4.language;
    }
  },
  methods: {
    formattedContent(_0x263ad8) {
      return _0x263ad8.split(/<br\s*\/?>/);
    },
    initApp() {
      const _0x590343 = this;
      const _0x3c311f = window.localStorage;
      const _0x25a879 = JSON.parse(_0x3c311f.getItem("APP_DATA_USER"));
      _0x590343.initBridge();
      _0x590343.initC();
      _0x590343.initConfig();
      _0x590343.init();
      _0x590343.initNotice();
      _0x590343.initUpdate();
      _0x590343.getPaymentMethod();
      _0x590343.getAppPlans();
      if (_0x25a879 != null) {
        _0x590343.getAppAlert();
      }
    },
    async initFetch() {
      const _0x6f284f = this;
      const _0x201431 = window.localStorage;
      try {
        await _0x6f284f.fetchAPIContent();
        const _0x3e449c = await _0x6f284f.checkAPIEndpoints();
        let _0x362878 = _0x3e449c + "/";
        _0x6f284f.url = _0x362878;
        _0x201431.setItem("APP_API_URL", _0x362878);
        _0x6f284f.initApp();
        console.log("最终获取到的数据:", _0x3e449c);
      } catch (_0x1fee8f) {
        console.error("程序出错:", _0x1fee8f);
      }
    },
    async fetchAPIContent() {
      const _0x349cf5 = this;
      let _0x5577de = Date.now();
      for (let _0x2b2729 of _0x349cf5.apihost) {
        try {
          const _0x2251cb = await fetch(_0x2b2729 + "?time=" + _0x5577de);
          if (_0x2251cb.ok) {
            const _0x4e2402 = await _0x2251cb.json();
            _0x349cf5.apiLists = _0x4e2402.url;
            return _0x4e2402.url;
          } else {
            console.warn("请求失败，状态码: " + _0x2251cb.status);
          }
        } catch (_0x59e9b1) {
          console.error("请求错误: " + _0x59e9b1);
        }
      }
      throw new Error("所有请求均失败");
    },
    async checkAPIEndpoints() {
      const _0x165288 = this;
      let _0x4cabd0 = Date.now();
      for (let _0x3c22e1 of _0x165288.apiLists) {
        try {
          const _0x4fbc59 = await fetch(_0x3c22e1 + "/api/v1/app/config?time=" + _0x4cabd0);
          const _0x429532 = await _0x4fbc59.json();
          if (_0x429532.data) {
            return _0x3c22e1;
          }
        } catch (_0x2af52f) {
          console.warn("请求 " + _0x3c22e1 + " 失败，尝试下一个");
        }
      }
      throw new Error("所有 API 请求均失败");
    },
    async updateApi() {
      const _0x8ad751 = this;
      const _0x175a36 = window.localStorage;
      try {
        await _0x8ad751.fetchAPIContent();
        const _0x4218c2 = await _0x8ad751.checkAPIEndpoints();
        let _0x1fba3d = _0x4218c2 + "/";
        _0x8ad751.url = _0x1fba3d;
        _0x175a36.setItem("APP_API_URL", _0x1fba3d);
        _0x8ad751.initC();
        _0x8ad751.initNotice();
        _0x8ad751.initUpdate();
        console.log("最终获取到的数据:", _0x4218c2);
      } catch (_0x2f1146) {
        console.error("程序出错:", _0x2f1146);
      }
    },
    buyOrder(_0x44ba1b) {
      const _0x5276cd = this;
      _0x5276cd.selectedPayID = _0x44ba1b.id;
      setTimeout(function () {
        _0x5276cd.isPay = true;
        _0x5276cd.ordersave();
      }, 100);
    },
    getPaymentMethod() {
      const _0x1d742f = this;
      fetch(_0x1d742f.url + "api/v1/app/apppaymentmethod", {
        method: "GET",
        headers: {
          Accept: "application/json, text/javascript, */*; q=0.01",
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
        }
      }).then(function (_0x3a12a6) {
        _0x3a12a6.json().then(function (_0xc77375) {
          if (_0xc77375 && _0xc77375.data != "") {
            _0x1d742f.payments = _0xc77375.data;
          }
        });
      }).catch(_0x2d3be5 => {
        _0x1d742f.getPaymentMethod();
        console.log(_0x2d3be5);
      });
    },
    getAppPlans() {
      const _0x3eb91d = this;
      _0x3eb91d.isFetchPlaning = true;
      _0x3eb91d.plans = [];
      _0x3eb91d.selectedPlans = [];
      fetch(_0x3eb91d.url + "api/v1/app/appshop", {
        method: "GET",
        headers: {
          Accept: "application/json, text/javascript, */*; q=0.01",
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
        }
      }).then(function (_0x2fd6a3) {
        _0x2fd6a3.json().then(function (_0x20cfd3) {
          _0x3eb91d.isFetchPlaning = false;
          if (_0x20cfd3) {
            if (_0x20cfd3.status == 1) {
              _0x3eb91d.plans = _0x20cfd3.data;
              if (_0x20cfd3.data.length > 0) {
                var _0x219a53 = [];
                var _0x4eb84e = _0x20cfd3.data[0];
                var _0x6f73f9 = _0x3eb91d.v2bKeysToConsider;
                if (_0x3eb91d.panelType === "v2board") {
                  _0x6f73f9 = _0x3eb91d.v2bKeysToConsider;
                } else {
                  _0x6f73f9 = _0x3eb91d.xbKeysToConsider;
                }
                _0x6f73f9.forEach(_0x180634 => {
                  if (_0x4eb84e[_0x180634] !== null && _0x4eb84e[_0x180634] !== undefined) {
                    const _0x34b226 = {
                      name: _0x180634,
                      price: _0x4eb84e[_0x180634]
                    };
                    _0x219a53.push(_0x34b226);
                  }
                });
                _0x3eb91d.selectedPlans = _0x219a53;
              }
            }
          }
        });
      }).catch(_0x16f4f0 => {
        _0x3eb91d.getAppPlans();
        _0x3eb91d.isFetchPlaning = false;
      });
    },
    applyCoupon() {
      const _0x113ea7 = this;
      if (_0x113ea7.isPay) {
        return;
      }
      _0x113ea7.animateCSS(".applyCouponBtn", "loginButtonAni");
      if (_0x113ea7.isCouponIng) {
        return;
      }
      _0x113ea7.isCouponIng = true;
      if (_0x113ea7.discountCode == "" || _0x113ea7.discountCode == null) {
        _0x113ea7.Toast(_0x113ea7.$t("lang.couponinputerror"), "warn");
        _0x113ea7.isCouponIng = false;
        return;
      }
      const _0x37216e = window.localStorage;
      const _0x1c3629 = JSON.parse(_0x37216e.getItem("APP_DATA_USER"));
      var _0x2a21ae = Date.parse(new Date());
      fetch(_0x113ea7.url + "api/v1/app/couponCheck?time=" + _0x2a21ae, {
        method: "POST",
        headers: {
          Accept: "application/json, text/javascript, */*; q=0.01",
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: "code=" + _0x113ea7.discountCode + "&plan_id=" + _0x113ea7.selectedPlanID + "&token=" + _0x1c3629.token
      }).then(_0x1e051e => {
        try {
          return _0x1e051e.json();
        } catch (_0x5ea5cd) {}
        return _0x1e051e.text();
      }).then(_0x1a00b6 => {
        console.log(_0x1a00b6);
        if (_0x1a00b6.message) {
          _0x113ea7.isCouponIng = false;
          _0x113ea7.Toast(_0x1a00b6.message, "warn");
          return;
        }
        if (_0x1a00b6.status == 1) {
          _0x113ea7.isCouponValue = _0x1a00b6.data.value / 100;
          _0x113ea7.isCoupon = true;
          _0x113ea7.Toast(_0x1a00b6.msg, "success");
        } else if (_0x1a00b6.msg) {
          _0x113ea7.Toast(_0x1a00b6.msg, "warn");
        } else {
          _0x113ea7.Toast(_0x1a00b6.message, "warn");
        }
        _0x113ea7.isCouponIng = false;
      }).catch(_0x150b6c => {
        _0x113ea7.isCouponIng = false;
      });
    },
    ordersave() {
      const _0xd1efd0 = this;
      const _0x4036ba = window.localStorage;
      const _0x91138e = JSON.parse(_0x4036ba.getItem("APP_DATA_USER"));
      var _0x210fc2 = Date.parse(new Date());
      fetch(_0xd1efd0.url + "api/v1/app/ordersave?time=" + _0x210fc2, {
        method: "POST",
        headers: {
          Accept: "application/json, text/javascript, */*; q=0.01",
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: "period=" + _0xd1efd0.selectedPlanCycle + "&plan_id=" + _0xd1efd0.selectedPlanID + "&token=" + _0x91138e.token + "&coupon_code=" + _0xd1efd0.discountCode
      }).then(_0x3f94c8 => {
        try {
          return _0x3f94c8.json();
        } catch (_0x4ee992) {}
        return _0x3f94c8.text();
      }).then(_0x4b8af7 => {
        if (_0x4b8af7.status === 1) {
          _0xd1efd0.selectedPlanOrderNo = _0x4b8af7.data;
          _0xd1efd0.checkout();
        } else if (_0x4b8af7.status === -1) {
          _0xd1efd0.ordersave();
        } else {
          _0xd1efd0.isPay = false;
          _0xd1efd0.selectedPayID = null;
          if (_0x4b8af7.msg) {
            _0xd1efd0.Toast(_0x4b8af7.msg, "warn");
          } else {
            _0xd1efd0.Toast(_0x4b8af7.message, "warn");
          }
        }
      }).catch(_0x34f65c => {
        _0xd1efd0.isPay = false;
        _0xd1efd0.selectedPayID = null;
      });
    },
    checkout() {
      const _0x5eef67 = this;
      const _0x3f9bb5 = window.localStorage;
      const _0x133a33 = JSON.parse(_0x3f9bb5.getItem("APP_DATA_USER"));
      var _0x21cb41 = Date.parse(new Date());
      fetch(_0x5eef67.url + "api/v1/app/checkout?time=" + _0x21cb41, {
        method: "POST",
        headers: {
          Accept: "application/json, text/javascript, */*; q=0.01",
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: "trade_no=" + _0x5eef67.selectedPlanOrderNo + "&method=" + _0x5eef67.selectedPayID + "&token=" + _0x133a33.token + "&usertoken=" + _0x133a33.token
      }).then(_0x522e96 => {
        try {
          return _0x522e96.json();
        } catch (_0x4d5a7a) {}
        return _0x522e96.text();
      }).then(_0x330683 => {
        if (_0x330683.status === 1) {
          _0x5eef67.detailOrder();
          _0x5eef67.selectedPlanLink = _0x330683.data;
        } else if (_0x330683.status === -1) {
          _0x5eef67.Toast(_0x330683.msg, "success");
          _0x5eef67.initConfig();
          _0x5eef67.isPay = false;
          _0x5eef67.isShowPlanInfo = false;
          _0x5eef67.selectedPayID = null;
          _0x5eef67.update();
        } else {
          _0x5eef67.isPay = false;
          _0x5eef67.selectedPayID = null;
          if (_0x330683.msg) {
            _0x5eef67.Toast(_0x330683.msg, "warn");
          } else {
            _0x5eef67.Toast(_0x330683.message, "warn");
          }
        }
      }).catch(_0x35af91 => {
        _0x5eef67.selectedPayID = null;
        _0x5eef67.isPay = false;
      });
    },
    checkPayStaus() {
      const _0xa760bd = this;
      const _0x22609a = window.localStorage;
      const _0x1ba2e7 = JSON.parse(_0x22609a.getItem("APP_DATA_USER"));
      _0xa760bd.isUpdateData = true;
      fetch(_0xa760bd.url + "api/v1/app/checktrade", {
        method: "POST",
        headers: {
          Accept: "application/json, text/javascript, */*; q=0.01",
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: "trade_no=" + _0xa760bd.selectedPlanOrderNo + "&token=" + _0x1ba2e7.token
      }).then(function (_0x15f874) {
        _0x15f874.json().then(function (_0x20be70) {
          if (_0x20be70) {
            if (_0x20be70.status == 1 || _0x20be70.status == 3) {
              _0xa760bd.isUpdateData = false;
              _0xa760bd.update();
              _0xa760bd.initConfig();
              _0xa760bd.isPayPopup = false;
              _0xa760bd.isPay = false;
              _0xa760bd.isShowPlanInfo = false;
              _0xa760bd.selectedPayID = null;
              _0xa760bd.Toast(_0xa760bd.$t("lang.planPurchaseSuccessful"), "success");
            } else if (_0x20be70.status === 0) {
              _0xa760bd.isUpdateData = false;
              _0xa760bd.Toast(_0xa760bd.$t("lang.NoPayment"), "warn");
            } else {
              _0xa760bd.isUpdateData = false;
              _0xa760bd.Toast(_0xa760bd.$t("lang.Cancelled"), "warn");
            }
          }
        });
      }).catch(_0x8f4112 => {
        _0xa760bd.isUpdateData = false;
      });
    },
    ContinueToPay() {
      const _0x4dba14 = this;
      shell.openExternal(_0x4dba14.selectedPlanLink);
    },
    detailOrder(_0x368ee1) {
      const _0x5c4a25 = this;
      const _0x32e6d4 = window.localStorage;
      const _0x5248be = JSON.parse(_0x32e6d4.getItem("APP_DATA_USER"));
      _0x5c4a25.selectedPlantotalDiscountAmount = 0;
      _0x5c4a25.selectedPlantotalHandlingAmount = 0;
      _0x5c4a25.selectedPlantotalAmount = 0;
      _0x5c4a25.selectedBalanceAmount = 0;
      fetch(_0x5c4a25.url + "api/v1/app/orderdetail?token=" + _0x5248be.token + "&trade_no=" + _0x5c4a25.selectedPlanOrderNo, {
        method: "POST",
        headers: {
          Accept: "application/json, text/javascript, */*; q=0.01",
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
        }
      }).then(function (_0x2dcc8f) {
        _0x2dcc8f.json().then(function (_0x51bf8e) {
          if (_0x51bf8e) {
            if (_0x51bf8e.status == 1) {
              _0x5c4a25.isPayPopup = true;
              _0x5c4a25.selectedPlantotalHandlingAmount = _0x51bf8e.data.handling_amount / 100;
              _0x5c4a25.selectedPlantotalDiscountAmount = _0x51bf8e.data.discount_amount / 100;
              _0x5c4a25.selectedPlantotalAmount = _0x51bf8e.data.total_amount / 100;
              _0x5c4a25.selectedBalanceAmount = _0x51bf8e.data.balance_amount / 100;
              if (_0x5c4a25.selectedPlantotalHandlingAmount > 0) {
                _0x5c4a25.selectedPlantotalAmount = _0x5c4a25.selectedPlantotalAmount + _0x5c4a25.selectedPlantotalHandlingAmount;
              }
              _0x5c4a25.isPay = false;
              setTimeout(function () {
                shell.openExternal(_0x5c4a25.selectedPlanLink);
              }, 300);
            } else {
              _0x5c4a25.isPay = false;
              _0x5c4a25.Toast(_0x51bf8e.msg, "warn");
            }
          }
        });
      }).catch(_0x32e618 => {
        _0x5c4a25.isPay = false;
        console.log(_0x32e618);
      });
    },
    ordercancel() {
      const _0x1796f2 = this;
      const _0x30e870 = window.localStorage;
      const _0x3a99da = JSON.parse(_0x30e870.getItem("APP_DATA_USER"));
      _0x1796f2.isUpdateData = true;
      fetch(_0x1796f2.url + "api/v1/app/ordercancel", {
        method: "POST",
        headers: {
          Accept: "application/json, text/javascript, */*; q=0.01",
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: "trade_no=" + _0x1796f2.selectedPlanOrderNo + "&token=" + _0x3a99da.token
      }).then(function (_0x50f3e6) {
        _0x50f3e6.json().then(function (_0x37a471) {
          if (_0x37a471) {
            if (_0x37a471.status === 1) {
              _0x1796f2.isUpdateData = false;
              _0x1796f2.isPay = false;
              _0x1796f2.isPayPopup = false;
              _0x1796f2.selectedPayID = null;
              _0x1796f2.isShowPlanInfo = false;
              _0x1796f2.Toast(_0x37a471.msg, "success");
            } else {
              _0x1796f2.isUpdateData = false;
              _0x1796f2.Toast(_0x37a471.msg, "warn");
            }
          }
        });
      }).catch(_0x305e9e => {
        console.log(_0x305e9e);
      });
    },
    cancelCoupon() {
      const _0xf42f68 = this;
      _0xf42f68.isCoupon = false;
      _0xf42f68.isCouponValue = null;
      _0xf42f68.discountCode = "";
      _0xf42f68.Toast(_0xf42f68.$t("lang.CanceledUseOfCoupon"), "warn");
    },
    selectPlan(_0x8aef14, _0x1aad18) {
      const _0x2cc869 = this;
      _0x2cc869.selectOderName = _0x8aef14.name;
      _0x2cc869.selectedPlanID = _0x8aef14.id;
      _0x2cc869.isShowPlanInfo = true;
      if (_0x8aef14 != null && _0x8aef14 != "") {
        var _0x5afa48 = [];
        _0x2cc869.selectedPlanCycle = "";
        _0x2cc869.selectedPlans = [];
        const _0x530e5f = _0x2cc869.panelType === "xboard";
        var _0x324c90 = _0x2cc869.v2bKeysToConsider;
        if (_0x2cc869.panelType === "v2board") {
          _0x324c90 = _0x2cc869.v2bKeysToConsider;
        } else {
          _0x324c90 = _0x2cc869.xbKeysToConsider;
        }
        _0x324c90.forEach(_0x2edb42 => {
          let _0x4b9d9e;
          if (_0x530e5f) {
            _0x4b9d9e = _0x8aef14.prices ? _0x8aef14.prices[_0x2edb42] : null;
          } else {
            _0x4b9d9e = _0x8aef14[_0x2edb42];
          }
          if (_0x4b9d9e !== null && _0x4b9d9e !== undefined) {
            const _0x246969 = {
              name: _0x2edb42,
              price: _0x4b9d9e
            };
            const _0x1062bc = _0x246969;
            _0x5afa48.push(_0x1062bc);
            if (_0x2cc869.selectedPlanCycle === "") {
              _0x2cc869.selectedPlanCycle = _0x2edb42;
            }
          }
        });
        _0x2cc869.selectedPlans = _0x5afa48;
      }
    },
    select(_0xa98986) {
      const _0x34c5ac = this;
      if (_0x34c5ac.isPay) {
        return;
      }
      _0x34c5ac.selectedPlanCycle = _0xa98986.name;
    },
    hidePlanInfo() {
      const _0x3ff7a6 = this;
      _0x3ff7a6.isShowPlanInfo = false;
      _0x3ff7a6.selectedPayID = null;
    },
    isHTML(_0xd4d5c) {
      return /<[^>]*>/.test(_0xd4d5c);
    },
    isJSON(content) {
        try {
            JSON.parse(content);
            return true;
        } catch (e) {
            return false;
        }
    },
	formatJSON(content) {
		try {
		  const data = JSON.parse(content);
		  if (!Array.isArray(data)) {
			return JSON.stringify(data, null, 2);
		  }
		  
		  let html = '<ul class="space-y-1">';
		  
		  data.forEach(item => {
			const icon = item.support 
			  ? '<svg class="mr-1 w-4 h-4 text-green-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>'
			  : '<svg class="mr-1 w-4 h-4 text-red-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';
			
			html += `<li class="flex items-center">${icon}<span class="text-sm text-gray-700 dark:text-neutral-200">${this.escapeHtml(item.feature)}</span></li>`;
		  });
		  
		  html += '</ul>';
		  return html;
		  
		} catch (error) {
		  return content;
		}
	},
	escapeHtml(text) {
		const div = document.createElement('div');
		div.textContent = text;
		return div.innerHTML;
	},
    winClose() {
      onClickControl("winHide", "");
    },
    winMini() {
      onClickControl("winMini", "");
    },
    hideWeb() {
      this.isWebStore = false;
    },
    initCrisp() {
      const _0x146883 = this;
      if (_0x146883.crispID == "") {
        return;
      }
      window.$crisp = [];
      window.CRISP_WEBSITE_ID = _0x146883.crispID;
      (function () {
        var _0x1eea18 = document;
        var _0x1fe991 = _0x1eea18.createElement("script");
        _0x1fe991.src = "https://client.crisp.chat/l.js";
        _0x1fe991.async = 1;
        _0x1eea18.getElementsByTagName("head")[0].appendChild(_0x1fe991);
      })();
      window.CRISP_READY_TRIGGER = function () {
        $crisp.push(["config", "hide:on:away", [true]]);
        $crisp.push(["do", "chat:hide"]);
        setTimeout(function () {
          $crisp.push(["config", "hide:on:away", [true]]);
          $(".crisp-client").addClass("isHide");
        }, 50);
        $($("#crisp-chatbox").get(0).firstChild.firstChild.nextSibling).remove();
        _0x146883.isCrisp = true;
        console.log("sdk ready1");
      };
    },
    copyInvite(_0x542718) {
      const _0x3aba44 = this;
      if (_0x542718 == "code") {
        _0x3aba44.animateCSS(".codeCopy", "loginButtonAni");
        _0x3aba44.Toast(_0x3aba44.$t("lang.copysuccessfully"), "success");
        if (navigator.clipboard) {
          navigator.clipboard.writeText(_0x3aba44.accountCode);
        }
      } else {
        if (navigator.clipboard) {
          let _0x513f09 = _0x3aba44.inviteUrl + _0x3aba44.invite_code;
          navigator.clipboard.writeText(_0x513f09);
        }
        _0x3aba44.Toast(_0x3aba44.$t("lang.copysuccessfully"), "success");
      }
    },
    invite() {
      const _0x121736 = this;
      _0x121736.showAccountInvite = true;
      _0x121736.getAppinvite();
      _0x121736.getAppinvitedetails();
      setTimeout(function () {
        HSTabs.autoInit();
      }, 100);
    },
    isImageFile(_0x3e31c5) {
      return /\.(jpeg|jpg|gif|png|svg)$/i.test(_0x3e31c5);
    },
    setColorCardHeight() {
      const _0x80f55e = this;
      _0x80f55e.animateCSS(".colorCard", "loginButtonAni");
      if (_0x80f55e.colorsHeight == 60) {
        _0x80f55e.colorsHeight = 230;
      } else {
        _0x80f55e.colorsHeight = 60;
      }
    },
    alphaToColor(_0x1d82be, _0x6b4584) {
      const _0xece507 = _0x1d82be.replace(/^#/, "");
      const _0x277c35 = parseInt(_0xece507, 16);
      const _0x38ca4b = _0x277c35 >> 16 & 255;
      const _0x4fc703 = _0x277c35 >> 8 & 255;
      const _0x433a53 = _0x277c35 & 255;
      const _0x79f86e = Math.min(1, Math.max(0, _0x6b4584));
      return "rgba(" + _0x38ca4b + ", " + _0x4fc703 + ", " + _0x433a53 + ", " + _0x79f86e + ")";
    },
    setTheme(_0xbb4782) {
      const _0x414303 = this;
      const _0x17f820 = window.localStorage;
      _0x17f820.setItem("APP_THEME", _0xbb4782.hex);
      _0x414303.apptheme = _0xbb4782.hex;
      _0x414303.sendMess("color", _0x414303.apptheme);
    },
    setAccountCardHeight() {
      const _0x4d64fc = this;
      if (_0x4d64fc.accountCardHeight == 100) {
        _0x4d64fc.accountCardHeight = 140;
      } else {
        _0x4d64fc.accountCardHeight = 100;
      }
    },
    setLangCardHeight() {
      const _0x1917ee = this;
      _0x1917ee.animateCSS(".langCard", "loginButtonAni");
      if (_0x1917ee.langsHeight == 60) {
        _0x1917ee.langsHeight = 270;
      } else {
        _0x1917ee.langsHeight = 60;
      }
    },
    setLang(_0x1f5726) {
      const _0x50e596 = this;
      const _0x134e82 = window.localStorage;
      _0x50e596.$i18n.locale = _0x1f5726.code;
      _0x134e82.setItem("APP_LANG", _0x1f5726.code);
      _0x50e596.language = _0x1f5726.code;
    },
    getRandomClass() {
      const _0x4771e2 = Math.floor(Math.random() * this.classesList.length);
      return this.classesList[_0x4771e2];
    },
    updateTheme() {
      const _0x234973 = this;
      const _0x1df23c = document.querySelector("html");
      const _0x510716 = localStorage.getItem("hs_theme") === "light" || localStorage.getItem("hs_theme") === "auto" && !window.matchMedia("(prefers-color-scheme: dark)").matches;
      const _0x5992a9 = localStorage.getItem("hs_theme") === "dark" || localStorage.getItem("hs_theme") === "auto" && window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (_0x510716 && _0x1df23c.classList.contains("dark")) {
        _0x1df23c.classList.remove("dark");
        _0x234973.isDarkorLight = "light";
      } else if (_0x5992a9 && _0x1df23c.classList.contains("light")) {
        _0x1df23c.classList.remove("light");
        _0x234973.isDarkorLight = "dark";
      } else if (_0x5992a9 && !_0x1df23c.classList.contains("dark")) {
        _0x1df23c.classList.add("dark");
        _0x234973.isDarkorLight = "dark";
      } else if (_0x510716 && !_0x1df23c.classList.contains("light")) {
        _0x1df23c.classList.add("light");
        _0x234973.isDarkorLight = "light";
      }
    },
    toggleAccordion(_0x23a260, _0x21dc55) {
      const _0x664924 = this;
      _0x664924.isFetchKnowing = true;
      $(".tosGuideText").html("");
      _0x664924.getGuideText(_0x23a260.id, _0x23a260);
      _0x23a260.isOpen = true;
    },
    getSystemTheme() {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        return "dark";
      } else {
        return "light";
      }
    },
    ConvertFlag(_0x100d91) {
      if (_0x100d91 === "cn") {
        return "assets/flags/cn.png";
      } else if (_0x100d91 === "en") {
        return "assets/flags/us.png";
      } else if (_0x100d91 === "vn") {
        return "assets/flags/vn.png";
      } else if (_0x100d91 === "hk") {
        return "assets/flags/hk.png";
      } else if (_0x100d91 === "fa") {
        return "assets/flags/ir.png";
      }
    },
    getAppAlert() {
      const _0x495df2 = this;
      const _0x53c4ce = window.localStorage;
      const _0x41a047 = JSON.parse(_0x53c4ce.getItem("APP_DATA_USER"));
      var _0x470f94 = "";
      if (_0x41a047 == null) {} else {
        _0x470f94 = _0x41a047.token;
      }
      fetch(_0x495df2.url + "api/v1/app/appalert", {
        method: "POST",
        headers: {
          Accept: "application/json, text/javascript, */*; q=0.01",
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: "token=" + _0x470f94 + "&lang=" + _0x495df2.language
      }).then(_0x35bc03 => {
        try {
          return _0x35bc03.json();
        } catch (_0x1a5a18) {}
        return _0x35bc03.text();
      }).then(_0x1e8009 => {
        if (_0x1e8009.status === 1) {
          _0x495df2.isAppAlert = true;
          if (_0x495df2.isHTML(_0x1e8009.context)) {
            _0x495df2.AppAlertMessage = "";
            setTimeout(function () {
              $(".AppAlertMessage").html(_0x1e8009.context);
            }, 100);
          } else {
            _0x495df2.AppAlertMessage = _0x1e8009.context;
          }
          _0x495df2.AppAlertTitle = _0x1e8009.title;
          _0x495df2.AppAlertImg = _0x1e8009.img;
          _0x495df2.AppAlertTags = _0x1e8009.tags;
        }
      }).catch(_0x93b80c => {
        console.log(_0x93b80c);
      });
    },
    getAppinvitedetails() {
      const _0x289452 = this;
      const _0x186de4 = window.localStorage;
      const _0x25cf84 = JSON.parse(_0x186de4.getItem("APP_DATA_USER"));
      var _0x435aee = "";
      if (_0x25cf84 == null) {} else {
        _0x435aee = _0x25cf84.token;
      }
      fetch(_0x289452.url + "api/v1/app/invitedetails", {
        method: "POST",
        headers: {
          Accept: "application/json, text/javascript, */*; q=0.01",
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: "token=" + _0x435aee
      }).then(_0xa10ac6 => {
        try {
          return _0xa10ac6.json();
        } catch (_0x2108f9) {}
        return _0xa10ac6.text();
      }).then(_0xea367a => {
        if (_0xea367a.message) {
          _0x289452.Toast(_0xea367a.message, "error");
          return;
        }
        _0x289452.invitedetails = [];
        if (_0xea367a.data) {
          _0x289452.invitedetails = _0xea367a.data;
        }
      }).catch(_0x3db18f => {
        console.log(_0x3db18f);
      });
    },
    Generate_new_invitation_code() {
      const _0x33f5b6 = this;
      const _0x53f167 = window.localStorage;
      const _0x37d73e = JSON.parse(_0x53f167.getItem("APP_DATA_USER"));
      var _0x22c885 = "";
      if (_0x37d73e == null) {} else {
        _0x22c885 = _0x37d73e.token;
      }
      _0x33f5b6.isGenerateing = true;
      fetch(_0x33f5b6.url + "api/v1/app/inviteCodeNew", {
        method: "POST",
        headers: {
          Accept: "application/json, text/javascript, */*; q=0.01",
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: "token=" + _0x22c885
      }).then(_0x46dd7b => {
        try {
          return _0x46dd7b.json();
        } catch (_0x73e7c6) {}
        return _0x46dd7b.text();
      }).then(_0x21de8d => {
        _0x33f5b6.isGenerateing = false;
        if (_0x21de8d.msg) {
          _0x33f5b6.Toast(_0x21de8d.msg, "error");
          return;
        }
        if (_0x21de8d.status === 1) {
          _0x33f5b6.getAppinvite();
          _0x33f5b6.Toast(_0x33f5b6.$t("lang.new_invitation_code_has_been_generated"), "success");
        }
      }).catch(_0x6cb670 => {
        _0x33f5b6.isGenerateing = false;
        console.log(_0x6cb670);
      });
    },
    getAppinvite() {
      const _0x23ec51 = this;
      const _0x1e4abd = window.localStorage;
      const _0x14034a = JSON.parse(_0x1e4abd.getItem("APP_DATA_USER"));
      var _0x3044a4 = "";
      if (_0x14034a == null) {} else {
        _0x3044a4 = _0x14034a.token;
      }
      _0x23ec51.isGenerateIngviteing = true;
      fetch(_0x23ec51.url + "api/v1/app/appinvite", {
        method: "POST",
        headers: {
          Accept: "application/json, text/javascript, */*; q=0.01",
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: "token=" + _0x3044a4
      }).then(_0x2cdeb8 => {
        try {
          return _0x2cdeb8.json();
        } catch (_0x40ad07) {}
        return _0x2cdeb8.text();
      }).then(_0x465f5c => {
        _0x23ec51.isGenerateIngviteing = false;
        if (_0x465f5c.message) {
          _0x23ec51.Toast(_0x465f5c.message, "error");
          return;
        }
        if (_0x465f5c.status === 1) {
          _0x23ec51.invite_code = _0x465f5c.code;
          _0x23ec51.invite_codes = _0x465f5c.codes;
          _0x23ec51.invite_commission_balance = _0x465f5c.invite_commission_balance / 100;
          _0x23ec51.invite_commission_rate = _0x465f5c.invite_commission_rate;
          _0x23ec51.invite_get_amount = _0x465f5c.invite_get_amount / 100;
          _0x23ec51.invite_uncheck_commission_balance = _0x465f5c.invite_uncheck_commission_balance / 100;
          _0x23ec51.invite_users = _0x465f5c.invite_users;
        }
      }).catch(_0x249e91 => {
        _0x23ec51.isGenerateIngviteing = false;
        console.log(_0x249e91);
      });
    },
    selectCode(_0xf98522) {
      const _0x55015d = this;
      _0x55015d.invite_code = _0xf98522;
    },
    formatOrderId(_0x3e8b59) {
      if (!_0x3e8b59 || _0x3e8b59.length < 6) {
        return _0x3e8b59;
      }
      return _0x3e8b59.slice(0, 3) + "..." + _0x3e8b59.slice(-3);
    },
    getOrders() {
      const _0x1b7246 = this;
      const _0xc7a607 = window.localStorage;
      _0x1b7246.isFetchOrdersing = true;
      const _0x58c9bd = JSON.parse(_0xc7a607.getItem("APP_DATA_USER"));
      var _0x47115a = "";
      if (_0x58c9bd == null) {} else {
        _0x47115a = _0x58c9bd.token;
      }
      fetch(_0x1b7246.url + "api/v1/app/orderfetch?token=" + _0x47115a, {
        method: "GET",
        headers: {
          Accept: "application/json, text/javascript, */*; q=0.01",
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
        }
      }).then(function (_0x13f20d) {
        _0x13f20d.json().then(function (_0x400a15) {
          _0x1b7246.orders = [];
          _0x1b7246.isFetchOrdersing = false;
          if (_0x400a15 && _0x400a15.data) {
            _0x1b7246.orders = _0x400a15.data;
          }
        });
      }).catch(_0x4ca3c6 => {
        _0x1b7246.getOrders();
        _0x1b7246.isFetchOrdersing = false;
      });
    },
    getAppPlans() {
      const _0x72c131 = this;
      _0x72c131.isFetchPlaning = true;
      _0x72c131.plans = [];
      _0x72c131.selectedPlans = [];
      fetch(_0x72c131.url + "api/v1/app/appshop", {
        method: "GET",
        headers: {
          Accept: "application/json, text/javascript, */*; q=0.01",
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
        }
      }).then(function (_0x5cf482) {
        _0x5cf482.json().then(function (_0x3e2a44) {
          _0x72c131.isFetchPlaning = false;
          if (_0x3e2a44) {
            if (_0x3e2a44.status == 1) {
              _0x72c131.plans = _0x3e2a44.data;
              if (_0x3e2a44.data.length > 0) {
                var _0x4e6bd0 = [];
                var _0x4fd1f2 = _0x3e2a44.data[0];
                var _0x353c16 = _0x72c131.v2bKeysToConsider;
                if (_0x72c131.panelType === "v2board") {
                  _0x353c16 = _0x72c131.v2bKeysToConsider;
                } else {
                  _0x353c16 = _0x72c131.xbKeysToConsider;
                }
                _0x353c16.forEach(_0x163d47 => {
                  if (_0x4fd1f2[_0x163d47] !== null && _0x4fd1f2[_0x163d47] !== undefined) {
                    const _0x4d3158 = {
                      name: _0x163d47,
                      price: _0x4fd1f2[_0x163d47]
                    };
                    _0x4e6bd0.push(_0x4d3158);
                  }
                });
                _0x72c131.selectedPlans = _0x4e6bd0;
              }
            }
          }
        });
      }).catch(_0x336578 => {
        _0x72c131.getAppPlans();
        _0x72c131.isFetchPlaning = false;
      });
    },
    initUpdate() {
      const _0x4c8a95 = this;
      fetch(_0x4c8a95.url + "api/v1/app/appupdate", {
        method: "POST",
        headers: {
          Accept: "application/json, text/javascript, */*; q=0.01",
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: "system=windows&version=" + _0x4c8a95.appVersion
      }).then(_0x30556c => {
        try {
          return _0x30556c.json();
        } catch (_0x33fa25) {}
        return _0x30556c.text();
      }).then(_0x186d09 => {
        if (_0x186d09.message) {
          _0x4c8a95.Toast(_0x186d09.message, "error");
          return;
        }
        if (_0x186d09.status == 1) {
          _0x4c8a95.isUpdate = true;
          _0x4c8a95.updateLink = _0x186d09.link;
          _0x4c8a95.updateMsg = _0x186d09.msg;
          _0x4c8a95.updateContextArr = _0x186d09.update_context;
        }
      }).catch(_0x198561 => {
        console.log(_0x198561);
      });
    },
    changeLang(_0x1bab7d) {
      const _0x4d8eb9 = this;
      _0x4d8eb9.isActiveLang = !_0x4d8eb9.isActiveLang;
      _0x1bab7d.stopPropagation();
      setTimeout(function () {
        _0x4d8eb9.isActiveMore = !_0x4d8eb9.isActiveMore;
      }, 5);
    },
    updateApp() {
      const _0x35d695 = this;
      shell.openExternal(_0x35d695.updateLink);
    },
    task1() {
      const _0x2c126d = this;
      _0x2c126d.statusText = "Getting_Ethernet";
      setTimeout(() => {
        _0x2c126d.task2();
      }, 2000);
    },
    task2() {
      const _0x51adbc = this;
      _0x51adbc.statusText = "Configuring_Ethernet";
      setTimeout(() => {
        _0x51adbc.task3();
      }, 1500);
    },
    task3() {
      const _0x121d80 = this;
      _0x121d80.statusText = "Starting_Ethernet";
    },
    formatBytes(_0x47bcf3, _0x3f3bb5 = 2) {
      if (_0x47bcf3 === 0) {
        return "0 Bytes";
      }
      const _0xaf51f2 = _0x3f3bb5 < 0 ? 0 : _0x3f3bb5;
      const _0x2deb04 = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
      const _0x5abc46 = Math.floor(Math.log(_0x47bcf3) / Math.log(1024));
      return parseFloat((_0x47bcf3 / Math.pow(1024, _0x5abc46)).toFixed(_0xaf51f2)) + " " + _0x2deb04[_0x5abc46];
    },
    initBridge() {
      const _0x5cf3e6 = this;
      const _0x146a4c = window.localStorage;
      const _0x1e1590 = JSON.parse(_0x146a4c.getItem("APP_DATA_USER"));
      ipc.on("appExit", function (_0x2fa9fd, _0x266712) {
        console.log("appExit");
        if (_0x266712 != null && _0x5cf3e6.wsServer != null) {
          _0x5cf3e6.wsServer.close();
        }
      });
      ipc.on("applog", function (_0x251277, _0x42b96f) {
        console.log("applog " + _0x42b96f);
      });
      ipc.on("coreStatus", function (_0xbee209, _0x4f7a66) {
        console.log("core state:" + _0x4f7a66);
        if (_0x4f7a66 != null) {
          _0x5cf3e6.isCoreing = false;
          if (_0x4f7a66 == "true") {
            _0x5cf3e6.isCore = true;
          }
        }
      });
      ipc.on("statusJS", function (_0x26e3a9, _0xecbb26) {
        if (_0xecbb26 != null) {
          if (_0xecbb26 == "false") {
            _0x5cf3e6.isStart = false;
            _0x5cf3e6.switchMode = "";
            _0x5cf3e6.statusText = "disconnect";
            _0x5cf3e6.Reset();
            _0x5cf3e6.tfUp = "0.0B";
            _0x5cf3e6.tfDown = "0.0B";
            _0x5cf3e6.tfupTotal = 0;
            _0x5cf3e6.tfdownTotal = 0;
            if (_0x5cf3e6.wsServer != null) {
              _0x5cf3e6.wsServer.close();
            }
          } else if (_0xecbb26 == "error") {
            _0x5cf3e6.switchMode = "";
            _0x5cf3e6.isStart = false;
            _0x5cf3e6.statusText = "disconnect";
            _0x5cf3e6.Toast(_0x5cf3e6.$t("lang.startErr"), "warn");
            _0x5cf3e6.Reset();
            _0x5cf3e6.tfUp = "0.0B";
            _0x5cf3e6.tfDown = "0.0B";
            _0x5cf3e6.tfupTotal = 0;
            _0x5cf3e6.tfdownTotal = 0;
            if (_0x5cf3e6.wsServer != null) {
              _0x5cf3e6.wsServer.close();
            }
          } else if (_0xecbb26 == "disconnecting") {
            _0x5cf3e6.statusText = "disconnecting";
          } else if (_0xecbb26 == "ing") {
            _0x5cf3e6.switchMode = "";
            _0x5cf3e6.isStart = true;
            _0x5cf3e6.statusText = "connecting";
          } else {
            _0x5cf3e6.switchMode = "testa";
            _0x5cf3e6.isStart = true;
            _0x5cf3e6.statusText = "connected";
            _0x5cf3e6.startTimeFunc(true);
            if (_0x5cf3e6.wsServer != null) {
              _0x5cf3e6.wsServer.close();
            }
            setTimeout(function () {
              _0x5cf3e6.clashMode();
              _0x5cf3e6.tfUp = "0.0B";
              _0x5cf3e6.tfDown = "0.0B";
              _0x5cf3e6.tfupTotal = 0;
              _0x5cf3e6.tfdownTotal = 0;
              _0x5cf3e6.wsServer = _0x5cf3e6.connectWebSocket("ws://127.0.0.1:9790/traffic");
            }, 1000);
          }
          setTimeout(function () {
            _0x5cf3e6.isStarting = false;
          }, 2000);
        }
      });
    },
    clashMode(_0x7be1d3) {
      const _0x3ecff9 = window.localStorage;
      const _0x2d01ca = this;
      if (_0x3ecff9.getItem("APP_DATA_MODE") == "" || _0x3ecff9.getItem("APP_DATA_MODE") == null) {
        _0x3ecff9.setItem("APP_DATA_MODE", 0);
      }
      if (_0x3ecff9.getItem("APP_DATA_INDEX") == "" || _0x3ecff9.getItem("APP_DATA_INDEX") == null) {
        _0x3ecff9.setItem("APP_DATA_INDEX", 0);
      }
      let _0x169b05 = "";
      if (_0x2d01ca.mode == 1) {
        _0x2d01ca.globalMode = "testa testani";
        _0x169b05 = "Global";
        const _0x1c9126 = {
          mode: _0x169b05
        };
        axios.patch("http://127.0.0.1:9790/configs/", _0x1c9126).then(_0x5484f2 => {
          if (_0x5484f2.status == 204) {
            _0x2d01ca.putProxy();
          }
        }).catch(_0x101767 => {
          console.log(_0x101767);
        });
      } else {
        _0x2d01ca.globalMode = "testb";
        _0x169b05 = "Rule";
        const _0x109f3d = {
          mode: _0x169b05
        };
        axios.patch("http://127.0.0.1:9790/configs/", _0x109f3d).then(_0x7bf09d => {
          if (_0x7bf09d.status == 204) {
            _0x2d01ca.putProxy();
          }
        }).catch(_0x4d6ba6 => {
          console.log(_0x4d6ba6);
        });
      }
    },
    putProxy() {
      const _0x51d143 = this;
      let _0x4106c1 = "http://127.0.0.1:9790/proxies/RULE";
      if (_0x51d143.mode == 0) {
        _0x4106c1 = "http://127.0.0.1:9790/proxies/RULE";
      } else {
        _0x4106c1 = "http://127.0.0.1:9790/proxies/GLOBAL";
      }
      const _0x9d5e70 = {
        name: _0x51d143.isCurreNodeName
      };
      const _0x4de33a = _0x9d5e70;
      axios.put(_0x4106c1, _0x4de33a).then(_0x225d2a => {
        console.log("changeDone");
      }).catch(_0x891ef9 => {
        console.log(_0x4106c1, _0x891ef9);
      });
    },
    init(_0x66a70e, _0x2efed0) {
      const _0x597eca = window.localStorage;
      const _0x261cf8 = this;
      const _0x55d550 = JSON.parse(_0x597eca.getItem("APP_DATA_USER"));
      if (_0x597eca.getItem("APP_DATA_MODE") == "" || _0x597eca.getItem("APP_DATA_MODE") == null) {
        _0x597eca.setItem("APP_DATA_MODE", 0);
      }
      if (_0x597eca.getItem("APP_DATA_INDEX") == "" || _0x597eca.getItem("APP_DATA_INDEX") == null) {
        _0x597eca.setItem("APP_DATA_INDEX", 0);
      }
      _0x261cf8.mode = _0x597eca.getItem("APP_DATA_MODE");
      _0x261cf8.nodeIndex = parseInt(_0x597eca.getItem("APP_DATA_INDEX"));
      if (_0x261cf8.mode == 1) {
        _0x261cf8.globalMode = "testa testani";
      } else {
        _0x261cf8.globalMode = "testb";
      }
      if (_0x55d550) {
        _0x261cf8.initSupportFile();
        if (!_0x66a70e) {
          _0x261cf8.update();
        } else if (_0x66a70e == "login") {} else {
          console.log("run login ");
        }
        _0x261cf8.user = _0x55d550;
        _0x261cf8.isLogin = true;
        _0x261cf8.isShowLogin = false;
        _0x261cf8.accountID = _0x55d550.accountID;
        _0x261cf8.accountName = _0x55d550.email;
        _0x261cf8.accountExpire = _0x55d550.expire;
        _0x261cf8.accountMoney = _0x55d550.money;
        _0x261cf8.accountPlan = _0x55d550.plan;
        _0x261cf8.accountBandwidth = _0x55d550.transferEnable;
        _0x261cf8.accountUserTf = _0x55d550.useTf;
        _0x261cf8.accountTfPercentage = _0x55d550.tfPercentage;
        _0x261cf8.accountdays = _0x55d550.accountdays;
        _0x261cf8.accountCode = _0x55d550.code;
        if (_0x261cf8.accountExpire != "") {
          if (_0x261cf8.isExpired(_0x261cf8.accountExpire)) {
            _0x261cf8.isShowAccountExp = true;
            _0x261cf8.isAccountExp = true;
            if (_0x261cf8.isStart) {
              _0x261cf8.sendMess("stopProxy", {
                name: "stopProxy"
              });
              _0x261cf8.isStart = false;
              _0x261cf8.Reset();
            }
          } else {
            _0x261cf8.isShowAccountExp = false;
            _0x261cf8.isAccountExp = false;
          }
        }
        if (_0x261cf8.accountTfPercentage === 0) {
          _0x261cf8.isAccountExhausted = true;
          _0x261cf8.isShowAccountTrafficExhausted = true;
          if (_0x261cf8.isStart) {
            _0x261cf8.sendMess("stopProxy", {
              name: "stopProxy"
            });
            _0x261cf8.isStart = false;
            _0x261cf8.Reset();
          }
        } else {
          _0x261cf8.isAccountExhausted = false;
          _0x261cf8.isShowAccountTrafficExhausted = false;
        }
        if (!_0x2efed0) {
          _0x261cf8.isShowHome = true;
          _0x261cf8.initConf();
        }
        if (_0x261cf8.isCore) {
          console.log("core started");
        } else if (!_0x261cf8.isCoreing) {
          onClickControl("InitCore");
          console.log("core start ing");
        }
      } else {
        _0x261cf8.isLogin = false;
        _0x261cf8.isShowHome = false;
        _0x261cf8.isShowLogin = true;
      }
    },
    isExpired(_0xc871c7) {
      var _0x190714 = new Date();
      var _0x163592 = new Date(_0xc871c7);
      if (_0x163592 < _0x190714) {
        return true;
      } else {
        return false;
      }
    },
    connectWebSocket(_0x54404c) {
      const _0x3ca3f9 = new WebSocket(_0x54404c);
      const _0x42673c = this;
      _0x3ca3f9.onopen = function (_0xa3d35e) {
        console.log("WebSocket连接已打开");
      };
      _0x3ca3f9.onmessage = function (_0x3b264a) {
        const _0x20c885 = _0x3b264a.data;
        const _0x330e2b = JSON.parse(_0x3b264a.data);
        _0x42673c.tfupTotal += parseInt(_0x330e2b.up);
        _0x42673c.tfdownTotal += parseInt(_0x330e2b.down);
        _0x42673c.tfUp = _0x42673c.formatBytes(parseInt(_0x42673c.tfupTotal));
        _0x42673c.tfDown = _0x42673c.formatBytes(parseInt(_0x42673c.tfdownTotal));
      };
      _0x3ca3f9.onclose = function (_0x189ec7) {
        console.log("WebSocket连接已关闭");
      };
      _0x3ca3f9.onerror = function (_0x15150f) {
        console.error("WebSocket发生错误:", _0x15150f);
      };
      function _0x4c62d8() {
        _0x3ca3f9.close();
      }
      const _0x5310e7 = {
        close: _0x4c62d8
      };
      const _0x597061 = _0x5310e7;
      return _0x597061;
    },
    initConf() {
      let _0x184312 = this;
      const _0x21dfcc = window.localStorage;
      if (_0x21dfcc.getItem("APP_DATA_USER") != null) {
        let _0x57aa3d = _0x21dfcc.getItem("APP_DATA_USER");
        let _0xf26312 = JSON.parse(_0x57aa3d);
        let _0x142b79 = _0xf26312.configsNodes;
        let _0x53f6ea = _0xf26312.configs;
        if (_0x142b79 != "" && _0x53f6ea != "" && _0x142b79 != undefined && _0x53f6ea != undefined) {
          _0x184312.nodes = [];
          let _0x2ae3f8 = "apps_connect_key";
          let _0x3994ec = "8c97f304422a60e0";
          let _0x4ce380 = _0x184312.AESdecrypt(_0x53f6ea, _0x2ae3f8, _0x3994ec);
          if (_0x4ce380 == "") {} else {
            let _0x582e7e = _0x184312.AESdecrypt(_0x142b79, _0x2ae3f8, _0x3994ec);
            _0x184312.nodes = JSON.parse(_0x582e7e);
            var _0x10d723 = JSON.parse(_0x4ce380);
            if (_0x10d723.inbounds.length > 1) {
              _0x10d723.inbounds = _0x10d723.inbounds.slice(1);
            } else {}
            if (_0x21dfcc.getItem("APP_DATA_TUN") === 1) {} else {}
            setTimeout(function () {
              onClickControl("saveSysConfig", _0x10d723);
            }, 500);
          }
        }
        if (_0x184312.isStart) {
          console.log("update sync done && isStart");
          _0x184312.clashMode(true);
          setTimeout(function () {
            onClickControl("Connect", "");
          }, 500);
        }
      }
      if (_0x184312.nodes.length > 0) {
        if (_0x184312.nodes.length > 0) {
          if (_0x21dfcc.getItem("APP_DATA_INDEX") != null) {
            let _0x230672 = _0x21dfcc.getItem("APP_DATA_INDEX");
            if (parseInt(_0x230672) > parseInt(_0x184312.nodes.length) - 1) {
              _0x184312.nodeIndex = 0;
              _0x184312.nodeName = _0x184312.nodes[0].name;
              _0x184312.nodeInfo = _0x184312.nodes[0].info;
              _0x184312.node = _0x184312.nodes[0];
              _0x184312.isCurreNodeName = _0x184312.nodes[0].name;
              _0x184312.isCurreNodeFlags = _0x184312.nodes[0].flag;
              _0x21dfcc.setItem("APP_DATA_INDEX", 0);
            } else {
              _0x184312.nodeIndex = parseInt(_0x230672);
              _0x184312.nodeName = _0x184312.nodes[_0x184312.nodeIndex].name;
              _0x184312.nodeInfo = _0x184312.nodes[_0x184312.nodeIndex].info;
              _0x184312.node = _0x184312.nodes[_0x184312.nodeIndex];
              _0x184312.isCurreNodeName = _0x184312.nodes[_0x184312.nodeIndex].name;
              _0x184312.isCurreNodeFlags = _0x184312.nodes[_0x184312.nodeIndex].flag;
            }
          }
        }
      }
    },
    flagtoImg(_0xb72a8f) {
      if (_0xb72a8f != "") {
        return "assets/flags/" + _0xb72a8f.toLowerCase() + ".png";
      }
    },
    AESencrypt(_0x812b60, _0x1e00a4, _0x302fda) {
      _0x1e00a4 = CryptoJS.enc.Utf8.parse(_0x1e00a4);
      _0x302fda = CryptoJS.enc.Utf8.parse(_0x302fda);
      var _0x26bcd3 = CryptoJS.AES.encrypt(_0x812b60, _0x1e00a4, {
        iv: _0x302fda,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      });
      return _0x26bcd3.toString();
    },
    AESdecrypt(_0x6ef7d8, _0x4031c6, _0x4fa1f9) {
      _0x4031c6 = CryptoJS.enc.Utf8.parse(_0x4031c6);
      _0x4fa1f9 = CryptoJS.enc.Utf8.parse(_0x4fa1f9);
      const _0xea78a3 = CryptoJS.AES.decrypt(_0x6ef7d8, _0x4031c6, {
        iv: _0x4fa1f9,
        padding: CryptoJS.pad.Pkcs7
      });
      return _0xea78a3.toString(CryptoJS.enc.Utf8);
    },
    pingNode() {
      const _0x42bd47 = this;
      if (_0x42bd47.isStart) {}
      if (_0x42bd47.isPing) {
        return;
      }
      if (_0x42bd47.isStart) {
        _0x42bd47.pingIndex = -1;
        _0x42bd47.nodeTcpping(_0x42bd47.pingIndex);
      } else {
        _0x42bd47.pingIndex = 0;
        _0x42bd47.nodesTcpPing(_0x42bd47.pingIndex);
      }
    },
    nodeTcpping(_0x4289d0) {
      const _0x295265 = this;
      let _0x18c8e5 = _0x295265.nodes.length - 1;
      if (_0x295265.pingIndex === _0x18c8e5) {
        _0x295265.isPing = false;
        _0x295265.pingIndex = -1;
        _0x295265.testMsg = "相等";
        return;
      }
      _0x295265.pingIndex = _0x295265.pingIndex + 1;
      let _0x1b2d96 = _0x295265.nodes[_0x295265.pingIndex].name;
      _0x295265.isPing = true;
      if (_0x1b2d96 === "AutoSelect") {
        _0x295265.nodeTcpping(_0x295265.pingIndex);
      } else {
        let _0x43f048 = "http://127.0.0.1:9790/proxies/" + encodeURI(_0x1b2d96) + "/delay?timeout=5000&url=http://www.gstatic.com/generate_204";
        fetch(_0x43f048, {
          method: "GET"
        }).then(_0x3e11a3 => {
          try {
            return _0x3e11a3.json();
          } catch (_0x1e1ab2) {}
          return _0x3e11a3.text();
        }).then(_0x4eef98 => {
          if ("message" in _0x4eef98) {
            _0x295265.nodes[_0x295265.pingIndex].ping = -1;
            _0x295265.nodes.sort();
          } else if ("delay" in _0x4eef98) {
            if (_0x4eef98.delay > 300) {
              _0x295265.nodes[_0x295265.pingIndex].ping = parseInt(_0x4eef98.delay / 4);
            } else {
              _0x295265.nodes[_0x295265.pingIndex].ping = parseInt(_0x4eef98.delay / 2);
            }
            _0x295265.nodes.sort();
          } else {
            _0x295265.nodes[_0x295265.pingIndex].ping = -1;
            _0x295265.nodes.sort();
          }
          _0x295265.nodeTcpping(_0x295265.pingIndex);
        }).catch(_0x1ff40b => {
          _0x295265.nodes[_0x295265.pingIndex].ping = -1;
          _0x295265.nodes.sort();
          _0x295265.nodeTcpping(_0x295265.pingIndex);
        });
      }
    },
    tcpPing(_0x43a9ea, _0x36992c) {
      const _0x52e748 = Date.now();
      const _0x4dfacb = new net.Socket();
      _0x4dfacb.setTimeout(5000);
      return new Promise((_0x2cee93, _0x61ace0) => {
        _0x4dfacb.on("connect", () => {
          _0x2cee93(Date.now() - _0x52e748);
          _0x4dfacb.destroy();
        }).on("error", _0xc45710 => {
          _0x61ace0(0);
        }).on("timeout", () => {
          _0x61ace0(0);
        }).connect(_0x36992c, _0x43a9ea);
      });
    },
    async nodesTcpPing() {
      const _0x866ad3 = this;
      _0x866ad3.isPing = true;
      if (_0x866ad3.nodes.length > 0) {
        _0x866ad3.nodes.forEach(async _0x232702 => {
          if (_0x232702.name == "AutoSelect" || _0x232702.type == "hysteria") {
            _0x866ad3.pingIndex = _0x866ad3.pingIndex + 1;
          } else {
            try {
              let _0xca0165 = await _0x866ad3.tcpPing(_0x232702.server, _0x232702.server_port);
              if (_0xca0165 > 300) {
                _0x232702.ping = parseInt(_0xca0165 / 4);
              } else {
                _0x232702.ping = parseInt(_0xca0165 / 2);
              }
              _0x866ad3.pingIndex = _0x866ad3.pingIndex + 1;
              _0x866ad3.nodes.sort();
              if (_0x232702.name == _0x866ad3.name) {
                _0x866ad3.ms = _0x232702.ping;
              }
            } catch (_0x288f00) {
              _0x232702.ping = -1;
              _0x866ad3.pingIndex = _0x866ad3.pingIndex + 1;
            }
            if (_0x866ad3.pingIndex == _0x866ad3.nodes.length) {
              _0x866ad3.isPing = false;
              _0x866ad3.pingIndex = 0;
            }
          }
        });
      } else {
        _0x866ad3.isPing = false;
      }
    },
    initNotice() {
      const _0x4a0353 = this;
      _0x4a0353.isFetchNotice = true;
      let _0x149a42 = new Date().getTime();
      fetch(_0x4a0353.url + "api/v1/app/appnotice?" + _0x149a42, {
        method: "GET",
        headers: {
          Accept: "application/json, text/javascript, */*; q=0.01",
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
        }
      }).then(_0x4987f6 => {
        try {
          return _0x4987f6.json();
        } catch (_0x181de2) {}
        return _0x4987f6.text();
      }).then(_0x526c12 => {
        _0x4a0353.noticeList = [];
        _0x4a0353.isFetchNotice = false;
        if (_0x526c12.message) {
          _0x4a0353.Toast(_0x526c12.message, "error");
          return;
        }
        if (_0x526c12.data) {
          _0x4a0353.noticeList = _0x526c12.data;
        }
      }).catch(_0x3fab91 => {
        _0x4a0353.isFetchNotice = false;
        console.log(_0x3fab91);
      });
    },
    initSupportFile() {
      const _0x3ca5ef = this;
      var _0x534726 = "zh-CN";
      if (_0x3ca5ef.language == "en") {
        _0x534726 = "en-US";
      } else if (_0x3ca5ef.language == "vi") {
        _0x534726 = "vi-VN";
      } else if (_0x3ca5ef.language == "fa") {
        _0x534726 = "fa-IR";
      } else {
        _0x534726 = "zh-CN";
      }
      _0x3ca5ef.isFetchKnowledge = true;
      let _0x257af9 = new Date().getTime();
      fetch(_0x3ca5ef.url + "api/v1/app/appknowledge?language=" + _0x534726 + "&" + _0x257af9, {
        method: "GET",
        headers: {
          Accept: "application/json, text/javascript, */*; q=0.01",
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
        }
      }).then(_0x5ca8ee => {
        try {
          return _0x5ca8ee.json();
        } catch (_0x6740fe) {}
        return _0x5ca8ee.text();
      }).then(_0xcb0d74 => {
        _0x3ca5ef.isFetchKnowledge = false;
        if (_0xcb0d74.message) {
          _0x3ca5ef.Toast(_0xcb0d74.message, "error");
          return;
        }
        _0x3ca5ef.guideList = [];
        if (_0xcb0d74.data) {
          let _0x42dfbd = Object.keys(_0xcb0d74.data);
          for (let _0x568565 = 0; _0x568565 < _0x42dfbd.length; _0x568565++) {
            _0xcb0d74.data[_0x42dfbd[_0x568565]].forEach(function (_0x4a512a) {
              _0x4a512a.isOpen = false;
              _0x3ca5ef.guideList.push(_0x4a512a);
            });
          }
          setTimeout(function () {
            HSAccordion.autoInit();
          }, 100);
        }
      }).catch(_0x250a17 => {
        _0x3ca5ef.isFetchKnowledge = false;
        console.log(_0x250a17);
      });
    },
    animateCSS(_0x41bb01, _0x2f4d46) {
      return new Promise(function (_0x4a5be, _0x14ad92) {
        var _0x2efa68 = "" + _0x2f4d46;
        var _0xfa0fe0 = document.querySelector(_0x41bb01);
        if (!_0xfa0fe0) {
          return;
        }
        _0xfa0fe0.classList.add("animated", _0x2efa68);
        function _0x389ab5(_0x332fc0) {
          _0x332fc0.stopPropagation();
          _0xfa0fe0.classList.remove("animated", _0x2efa68);
          _0x4a5be("Animation ended");
        }
        _0xfa0fe0.addEventListener("animationend", _0x389ab5, {
          once: true
        });
      });
    },
    setUpdate(_0x3e1e57) {
      const _0x130ceb = window.localStorage;
      const _0x33c557 = this;
      const _0x53af9b = JSON.parse(_0x130ceb.getItem("APP_DATA_USER"));
      if (_0x130ceb.getItem("APP_DATA_MODE") == "" || _0x130ceb.getItem("APP_DATA_MODE") == null) {
        _0x130ceb.setItem("APP_DATA_MODE", 0);
      }
      if (_0x130ceb.getItem("APP_DATA_INDEX") == "" || _0x130ceb.getItem("APP_DATA_INDEX") == null) {
        _0x130ceb.setItem("APP_DATA_INDEX", 0);
      }
      if (_0x53af9b) {
        _0x33c557.user = _0x53af9b;
        _0x33c557.isLogin = true;
        _0x33c557.isShowLogin = false;
        _0x33c557.accountID = _0x53af9b.accountID;
        _0x33c557.accountName = _0x53af9b.email;
        _0x33c557.accountExpire = _0x53af9b.expire;
        _0x33c557.accountMoney = _0x53af9b.money;
        _0x33c557.accountPlan = _0x53af9b.plan;
        _0x33c557.accountBandwidth = _0x53af9b.transferEnable;
        _0x33c557.accountUserTf = _0x53af9b.useTf;
        _0x33c557.accountTfPercentage = _0x53af9b.tfPercentage;
        _0x33c557.accountdays = _0x53af9b.accountdays;
        _0x33c557.accountCode = _0x53af9b.code;
        if (_0x33c557.accountTfPercentage === 0) {
          _0x33c557.isAccountExhausted = true;
          _0x33c557.isShowAccountTrafficExhausted = true;
          if (_0x33c557.isStart) {
            _0x33c557.sendMess("stopProxy", {
              name: "stopProxy"
            });
            _0x33c557.isStart = false;
            _0x33c557.Reset();
          }
        } else {
          _0x33c557.isAccountExhausted = false;
          _0x33c557.isShowAccountTrafficExhausted = false;
        }
        if (_0x33c557.accountExpire !== "") {
          if (_0x33c557.isExpired(_0x33c557.accountExpire)) {
            _0x33c557.isShowAccountExp = true;
            _0x33c557.isAccountExp = true;
            if (_0x33c557.isStart) {
              _0x33c557.sendMess("stopProxy", {
                name: "stopProxy"
              });
              _0x33c557.isStart = false;
              _0x33c557.Reset();
            }
          } else {
            _0x33c557.isShowAccountExp = false;
            _0x33c557.isAccountExp = false;
          }
        }
      }
    },
    initConfig() {
      const _0x33f08b = this;
      const _0x179420 = window.localStorage;
      let _0x2edaeb = Date.now();
      _0x33f08b.updateApi();
    },
    initC() {
      const _0x39548b = this;
      const _0xc36741 = window.localStorage;
      const _0x53dd43 = JSON.parse(_0xc36741.getItem("APP_DATA_USER"));
      var _0x3cc0b7 = "";
      if (_0x53dd43 == null) {} else {
        _0x3cc0b7 = _0x53dd43.token;
      }
      fetch(_0x39548b.url + "api/v1/app/config?token=" + _0x3cc0b7, {
        method: "GET",
        headers: {
          Accept: "application/json, text/javascript, */*; q=0.01",
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
        }
      }).then(function (_0x5bdbfb) {
        _0x5bdbfb.json().then(function (_0x51754d) {
          if (_0x51754d.data) {
            if (_0x51754d.data.emailWhitelistSuffix.length > 0) {
              _0x39548b.emailList = _0x51754d.data.emailWhitelistSuffix;
              _0x39548b.signEmailSelect = _0x51754d.data.emailWhitelistSuffix[0];
            }
            if (_0x51754d.data.appDescription) {
              _0x39548b.appDescription = _0x51754d.data.appDescription;
            }
            if (_0x51754d.data.appName) {
              _0x39548b.appName = _0x51754d.data.appName;
            }
            if (_0x51754d.data.icon) {
              _0x39548b.appLogo = _0x51754d.data.icon;
            }
            if (_0x51754d.data.appUrl) {}
            if (_0x51754d.data.currency_symbol == "" || _0x51754d.data.currency_symbol == null) {} else {
              _0x39548b.currency_symbol = _0x51754d.data.currency_symbol;
            }
            if (_0x51754d.data.isInviteForce == 1) {
              _0x39548b.isNeedInvite = true;
            }
            if (_0x51754d.data.chatUrl == null || _0x51754d.data.chatUrl == "") {
              _0x39548b.chatUrl = "";
            } else if (_0x39548b.chatUrl == null || _0x39548b.chatUrl === "") {
              _0x39548b.chatUrl = _0x51754d.data.chatUrl;
            }
            if (_0x51754d.data.chatType === "" || _0x51754d.data.chatType == null) {} else {
              _0x39548b.chatType = _0x51754d.data.chatType;
            }
            if (_0x51754d.data.chatLink === "" || _0x51754d.data.chatLink == null) {} else {
              _0x39548b.chatLink = _0x51754d.data.chatLink;
            }
            if (_0x51754d.data.isSupport) {
              _0x39548b.isSupport = true;
            } else {
              _0x39548b.isSupport = false;
            }
            if (_0x51754d.data.chatID === "" || _0x51754d.data.chatID == null) {} else {
              _0x39548b.chatID = _0x51754d.data.chatID;
              if (_0x39548b.chatType === "crisp") {
                _0x39548b.crispID = _0x51754d.data.chatID;
                _0x39548b.initCrisp();
              }
            }
            if (_0x51754d.data.panelType === "" || _0x51754d.data.panelType == null) {} else {
              _0x39548b.panelType = _0x51754d.data.panelType;
            }
            if (_0x51754d.data.inviteUrl === "" || _0x51754d.data.inviteUrl === null) {} else {
              _0x39548b.inviteUrl = _0x51754d.data.inviteUrl;
            }
            if (_0x51754d.data.isEmailVerify == 1) {
              _0x39548b.isEmailVerify = true;
            }
            if (_0x51754d.data.tggroup != "") {
              _0x39548b.isTggroup = true;
              _0x39548b.tggrouplink = _0x51754d.data.tggroup;
            }
            if (_0x51754d.data.tos != "") {
              _0x39548b.isTos = true;
              _0x39548b.toslink = _0x51754d.data.tos;
            }
            if (_0x51754d.data.privacy != "") {
              _0x39548b.isPP = true;
              _0x39548b.pplink = _0x51754d.data.privacy;
            }
            if (_0x51754d.data.website != "") {
              _0x39548b.isWebsite = true;
              _0x39548b.weblink = _0x51754d.data.website;
              _0x39548b.weburl = _0x51754d.data.website + "/";
            }
          }
        });
      });
    },
    showGuide(_0x5ad4c7, _0x4644bb) {
      const _0x2d9401 = this;
      const _0x2b702c = _0x4644bb.target.parentNode.parentNode;
      var _0x202520 = $(_0x2b702c);
      var _0x42ebac = $(_0x2b702c).find("svg");
      if (_0x2d9401.isShow == _0x5ad4c7) {
        $(".tosGuideList").css({
          height: "65px"
        });
        $(".tosGuideList svg").css({
          transform: "rotate(0)"
        });
        _0x2d9401.isShow = "";
        return;
      }
      _0x2d9401.getGuideText(_0x5ad4c7);
      _0x2d9401.isShow = _0x5ad4c7;
      $(".tosGuideText").text("加载中...");
      $(".tosGuideList").css({
        height: "65px"
      });
      $(".tosGuideList svg").css({
        transform: "rotate(0)"
      });
      setTimeout(function () {
        $(_0x202520).css({
          height: "auto"
        });
        $(_0x42ebac).css({
          transform: "rotate(180deg)"
        });
      }, 100);
    },
    getGuideText(_0x6995e2) {
      const _0x13892f = this;
      _0x13892f.knowledgeText = "";
      fetch(_0x13892f.url + "api/v1/app/appknowledge?id=" + _0x6995e2 + "&language=zh-CN", {
        method: "GET",
        headers: {
          Accept: "application/json, text/javascript, */*; q=0.01",
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
        }
      }).then(_0x24e8de => {
        try {
          return _0x24e8de.json();
        } catch (_0x474a88) {}
        return _0x24e8de.text();
      }).then(_0x3cfeaf => {
        if (_0x3cfeaf.message) {
          _0x13892f.Toast(_0x3cfeaf.message, "warn");
          return;
        }
        if (_0x3cfeaf.data) {
          if (_0x13892f.containsHTMLTags(_0x3cfeaf.data.body)) {
            $(".tosGuideText").html(_0x3cfeaf.data.body);
          } else {
            _0x13892f.knowledgeText = _0x3cfeaf.data.body;
          }
        }
      }).catch(_0x56b049 => {
        if (_0x56b049) {
          $(".tosGuideText").text(_0x56b049);
        }
      });
    },
    containsHTMLTags(_0x2cd3f2) {
      return /<\/?[\w\s="/.':;#-\/\?]+>/gi.test(_0x2cd3f2);
    },
    sendMess(_0x2d8bc2, _0x1a76db) {
      const _0x5054d8 = this;
      const _0x4aed77 = window.localStorage;
      const _0x299cd9 = JSON.parse(_0x4aed77.getItem("userInfo"));
      switch (_0x2d8bc2) {
        case "syncMode":
          window.WebViewJavascriptBridge.callHandler("syncMode", _0x1a76db, function (_0x1951e5) {
            if (_0x1951e5 != "false") {
              console.log("syncMode成功");
            }
          });
          break;
        case "syncNode":
          window.WebViewJavascriptBridge.callHandler("syncNode", _0x1a76db, function (_0x48de82) {
            if (_0x48de82 != "false") {
              console.log("syncNode成功");
            }
          });
          break;
        case "startProxy":
          onClickControl("Connect", "");
          break;
        case "stopProxy":
          onClickControl("Stop");
          break;
        case "syncWeb":
          window.WebViewJavascriptBridge.callHandler("syncWeb", _0x1a76db, function (_0x38788f) {
            if (_0x38788f != "false") {}
          });
          break;
        default:
          console.log("null");
      }
    },
    startProxy() {
      let _0x310bc5 = this;
      _0x310bc5.animateCSS(".Ellipse0", "scaleAnimate");
      _0x310bc5.animateCSS(".Ellipse1", "scaleAnimate1");
      _0x310bc5.animateCSS(".Ellipse2", "scaleAnimate2");
      _0x310bc5.animateCSS(".Ellipse3", "scaleAnimate3");
      if (_0x310bc5.nodes.length < 1) {
        _0x310bc5.Toast(_0x310bc5.$t("lang.No_line_available"), "warn");
        return;
      }
      if (_0x310bc5.isAccountExhausted) {
        _0x310bc5.isShowAccountTrafficExhausted = true;
        if (_0x310bc5.isStart) {
          _0x310bc5.sendMess("stopProxy", {
            name: "stopProxy"
          });
          _0x310bc5.isStart = false;
          _0x310bc5.Reset();
        }
        return;
      }
      if (_0x310bc5.accountExpire != "") {
        if (_0x310bc5.isExpired(_0x310bc5.accountExpire)) {
          _0x310bc5.isShowAccountExp = true;
          _0x310bc5.isAccountExp = true;
          if (_0x310bc5.isStart) {
            _0x310bc5.sendMess("stopProxy", {
              name: "stopProxy"
            });
            _0x310bc5.isStart = false;
            _0x310bc5.Reset();
          }
          return;
        } else {
          _0x310bc5.isShowAccountExp = false;
          _0x310bc5.isAccountExp = false;
        }
      }
      if (_0x310bc5.isStarting) {
        return;
      }
      if (_0x310bc5.isStart) {
        _0x310bc5.statusText = "disconnecting";
        onClickControl("Stop");
      } else {
        _0x310bc5.statusText = "connecting";
        onClickControl("Connect", "");
      }
      _0x310bc5.statusText = "connecting";
      _0x310bc5.isStarting = true;
    },
    backLogin() {
      const _0x575ea5 = this;
      _0x575ea5.isShowForgetSuccess = false;
      _0x575ea5.isShowLogin = true;
    },
    openWeb(_0x2cdd61) {
      const _0x5df153 = this;
      var _0x120f08 = "";
      if (_0x2cdd61 == "web") {
        _0x120f08 = _0x5df153.weblink;
        _0x5df153.animateCSS(".webBtn", "loginButtonAni");
      } else if (_0x2cdd61 == "tg") {
        _0x120f08 = _0x5df153.tggrouplink;
        _0x5df153.animateCSS(".tgBtn", "loginButtonAni");
      } else if (_0x2cdd61 == "tos") {
        _0x120f08 = _0x5df153.toslink;
        _0x5df153.animateCSS(".tosBtn", "loginButtonAni");
      } else if (_0x2cdd61 == "privacy") {
        _0x120f08 = _0x5df153.pplink;
        _0x5df153.animateCSS(".privacyBtn", "loginButtonAni");
      }
      setTimeout(function () {
        shell.openExternal(_0x120f08);
      }, 300);
    },
    nodeSwipe() {
      const _0x1739a2 = this;
      _0x1739a2.changeMenuItem("nodelist");
    },
    nodeHideSwipe() {
      const _0x203488 = this;
      _0x203488.hideMenuIco("nodelist");
    },
    menuSwipe() {
      const _0xe53b25 = this;
      _0xe53b25.hideMenu();
    },
    selectNodes(_0x229452, _0x4c969e) {
      const _0x5984ce = this;
      const _0x4c232e = window.localStorage;
      var _0x2693d2 = "http://127.0.0.1:9790/proxies/RULE";
      if (_0x5984ce.mode == 0) {
        _0x2693d2 = "http://127.0.0.1:9790/proxies/RULE";
      } else {
        _0x2693d2 = "http://127.0.0.1:9790/proxies/GLOBAL";
      }
      const _0x2cdd69 = {
        name: _0x229452.name
      };
      const _0x162316 = _0x2cdd69;
      if (_0x5984ce.isStart) {
        axios.put(_0x2693d2, _0x162316).then(_0x5a5a71 => {
          console.log("change success");
        }).catch(_0x13e3a9 => {});
      }
      _0x4c232e.setItem("APP_DATA_INDEX", _0x4c969e);
      _0x5984ce.nodeIndex = _0x4c969e;
      _0x5984ce.isCurreNodeName = _0x229452.name;
      _0x5984ce.isCurreNodeFlags = _0x229452.flag;
      _0x5984ce.nodeInfo = _0x229452.info;
      _0x5984ce.node = _0x229452;
      setTimeout(function () {
        _0x5984ce.hideMenuIco("nodelist");
      }, 200);
    },
    formatTime(_0x190d89, _0x31153e) {
      function _0x331a2a(_0x1500cc) {
        _0x1500cc = _0x1500cc.toString();
        if (_0x1500cc[1]) {
          return _0x1500cc;
        } else {
          return "0" + _0x1500cc;
        }
      }
      var _0x113817 = ["Y", "M", "D", "h", "m", "s"];
      var _0x4b26e1 = [];
      var _0x46a9e7 = new Date(_0x190d89 * 1000);
      _0x4b26e1.push(_0x46a9e7.getFullYear());
      _0x4b26e1.push(_0x331a2a(_0x46a9e7.getMonth() + 1));
      _0x4b26e1.push(_0x331a2a(_0x46a9e7.getDate()));
      _0x4b26e1.push(_0x331a2a(_0x46a9e7.getHours()));
      _0x4b26e1.push(_0x331a2a(_0x46a9e7.getMinutes()));
      _0x4b26e1.push(_0x331a2a(_0x46a9e7.getSeconds()));
      for (var _0x5b0a3f in _0x4b26e1) {
        _0x31153e = _0x31153e.replace(_0x113817[_0x5b0a3f], _0x4b26e1[_0x5b0a3f]);
      }
      return _0x31153e;
    },
    changeTun() {
      const _0x14d943 = this;
      const _0x2e8a5b = window.localStorage;
      if (_0x14d943.tunMode == "testb") {
        _0x14d943.tunMode = "testa testani";
        _0x2e8a5b.setItem("APP_DATA_TUN", 1);
      } else {
        _0x14d943.tunMode = "testb";
        _0x2e8a5b.setItem("APP_DATA_TUN", 0);
      }
    },
    changeMode(_0x5f3ae1) {
      const _0x24dc5e = this;
      const _0x36b212 = window.localStorage;
      let _0xfba0b0 = "Rule";
      if (_0x24dc5e.globalMode == "testb") {
        _0x24dc5e.globalMode = "testa testani";
        _0x24dc5e.mode = 1;
        _0xfba0b0 = "Global";
      } else {
        console.log(true);
        _0x24dc5e.globalMode = "testb";
        _0x24dc5e.mode = 0;
        _0xfba0b0 = "Rule";
      }
      const _0x341a92 = {
        mode: _0xfba0b0
      };
      const _0x5100a3 = _0x341a92;
      if (_0x24dc5e.isStart) {
        axios.patch("http://127.0.0.1:9790/configs/", _0x5100a3).then(_0x4e04a9 => {
          if (_0x4e04a9.status == 204) {
            _0x24dc5e.putProxy();
          }
        }).catch(_0x4dace0 => {
          console.log(_0x4dace0);
        });
      }
      _0x36b212.setItem("APP_DATA_MODE", _0x24dc5e.mode);
    },
    logout() {
      const _0x4e565d = this;
      const _0x1670ce = window.localStorage;
      const _0xbcc6 = JSON.parse(_0x1670ce.getItem("APP_DATA_USER"));
      _0x4e565d.hideMenuIco("exit");
      if (_0x4e565d.isStart) {
        _0x4e565d.sendMess("stopProxy", {
          name: "stopProxy"
        });
        _0x4e565d.isStart = false;
        _0x4e565d.Reset();
      }
      _0x1670ce.removeItem("APP_DATA_USER");
      _0x1670ce.setItem("APP_DATA_MODE", 0);
      _0x1670ce.setItem("APP_DATA_INDEX", 0);
      _0x4e565d.tunMode = "testb";
      _0x1670ce.setItem("APP_DATA_TUN", 0);
      _0x4e565d.nodeIndex = 0;
      _0x4e565d.nodes = [];
      _0x4e565d.nodesPing = [];
      _0x4e565d.nodesAddr = [];
      _0x4e565d.isCurreNodeName = "无线路可使用";
      _0x4e565d.isCurreNodePing = 0;
      _0x4e565d.isCurreNodeFlags = "static/flags/null.png";
      _0x4e565d.isShowAccount = false;
      _0x4e565d.isShowMore = false;
      _0x4e565d.accountName = "";
      _0x4e565d.tabIndex = "home";
      _0x4e565d.init();
      _0x4e565d.Toast("退出成功", "success");
    },
    startTimeFunc(_0x1f9dbe) {
      const _0x1b3077 = this;
      if (_0x1b3077.startTime !== "00:00:00") {
        return;
      }
      if (_0x1f9dbe) {
        _0x1b3077.hour = 0;
        _0x1b3077.minute = 0;
        _0x1b3077.second = 0;
        _0x1b3077.startTime = "00:00:00";
        _0x1b3077.timer = setInterval(() => {
          _0x1b3077.second++;
          if (_0x1b3077.second >= 60) {
            _0x1b3077.second = 0;
            _0x1b3077.minute++;
          }
          if (_0x1b3077.minute >= 60) {
            _0x1b3077.minute = 0;
            _0x1b3077.hour++;
          }
          const _0x210d66 = _0x5d173b => _0x5d173b < 10 ? "0" + _0x5d173b : _0x5d173b;
          _0x1b3077.startTime = _0x210d66(_0x1b3077.hour) + ":" + _0x210d66(_0x1b3077.minute) + ":" + _0x210d66(_0x1b3077.second);
        }, 1000);
      } else {
        clearInterval(_0x1b3077.timer);
        _0x1b3077.startTime = "00:00:00";
        _0x1b3077.hour = 0;
        _0x1b3077.minute = 0;
        _0x1b3077.second = 0;
      }
    },
    Reset() {
      const _0x5390be = this;
      window.clearInterval(_0x5390be.timer);
      _0x5390be.startTime = "00:00:00";
      _0x5390be.hour = 0;
      _0x5390be.minute = 0;
      _0x5390be.second = 0;
    },
    update(_0x1fe0e8) {
      const _0x261b6e = this;
      const _0x3259fc = window.localStorage;
      const _0x31265f = JSON.parse(_0x3259fc.getItem("APP_DATA_USER"));
      let _0x5a7e92 = _0x31265f.email;
      let _0xf6693c = _0x31265f.passwd;
      let _0x27d122 = _0x31265f.token;
      function _0x61666b(_0x21072e) {
        var _0xac5e6a = JSON.stringify(_0x21072e);
        _0x3259fc.setItem("APP_DATA_USER", _0xac5e6a);
        _0x261b6e.setUpdate();
      }
      if (_0x261b6e.isUpdateData) {
        return;
      }
      _0x261b6e.isUpdateData = true;
      var _0x3f8758 = Date.parse(new Date());
      fetch(_0x261b6e.url + "api/v1/app/appsync?time=" + _0x3f8758, {
        method: "POST",
        headers: {
          Accept: "application/json, text/javascript, */*; q=0.01",
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: "token=" + _0x27d122 + "&v=" + _0x261b6e.appVersion
      }).then(_0x4c9a2d => {
        try {
          return _0x4c9a2d.json();
        } catch (_0x64357b) {}
        return _0x4c9a2d.text();
      }).then(_0x45c102 => {
        _0x261b6e.isLoging = false;
        _0x261b6e.isUpdateData = false;
        let _0x27ee83 = new Date().getTime();
        localStorage.setItem("lastRefreshTime", _0x27ee83);
        console.log("initUpdate end");
        if (_0x45c102.status == 1) {
          const _0x461968 = {
            email: _0x45c102.email,
            accountID: _0x45c102.id,
            expire: _0x45c102.expired,
            plan: _0x45c102.planName,
            conf: _0x45c102.conf,
            link: _0x45c102.link,
            residue: _0x45c102.residue,
            userTf: _0x45c102.usedTraffic,
            tfPercentage: _0x45c102.tfPercentage,
            accountdays: _0x45c102.days,
            code: _0x45c102.code,
            token: _0x45c102.token,
            transferEnable: _0x45c102.transfer_enable,
            useTf: _0x45c102.useTf,
            web: _0x45c102.web,
            configs: _0x45c102.configs,
            configsNodes: _0x45c102.configsNodes,
            chatLink: _0x45c102.chatLink
          };
          const _0x4533eb = _0x461968;
          const _0x7034ea = _0x4533eb;
          if (_0x45c102.configs != "") {
            if (_0x45c102.configs === _0x31265f.configs) {
              console.log("No update required");
              _0x61666b(_0x7034ea);
              setTimeout(function () {
                _0x261b6e.init("login", true);
                _0x261b6e.setUpdate();
              }, 500);
            } else {
              _0x61666b(_0x7034ea);
              console.log("Need to be updated");
              setTimeout(function () {
                _0x261b6e.init("login");
                _0x261b6e.setUpdate();
              }, 500);
            }
          } else {
            _0x61666b(_0x7034ea);
            console.log("Need to be updated2");
            setTimeout(function () {
              _0x261b6e.init("login");
              _0x261b6e.setUpdate();
            }, 500);
          }
          _0x261b6e.isLoging = false;
        } else if (_0x45c102.msg) {
          _0x261b6e.Toast(_0x45c102.msg, "warn");
          if (_0x45c102.msg === "User information error") {
            _0x261b6e.logout();
            return;
          }
        } else {
          _0x261b6e.Toast(_0x45c102.reason, "warn");
        }
      }).catch(_0x3b3f37 => {
        _0x261b6e.isUpdateData = false;
        _0x261b6e.isLoging = false;
      });
    },
    sendEmail() {
      var _0x2e6615 = this;
      if (_0x2e6615.isSend) {
        return;
      }
      _0x2e6615.animateCSS(".getEmailCode", "loginButtonAni");
      if (_0x2e6615.signEmail == "") {
        _0x2e6615.Toast(_0x2e6615.$t("lang.emailinputerror"), "warn");
        return;
      }
      _0x2e6615.isSend = true;
      fetch(_0x2e6615.url + "api/v1/app/appsendEmailVerify", {
        method: "POST",
        headers: {
          Accept: "application/json, text/javascript, */*; q=0.01",
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: "email=" + _0x2e6615.signEmail + "@" + _0x2e6615.signEmailSelect
      }).then(function (_0x30b543) {
        _0x2e6615.isSend = false;
        _0x30b543.json().then(function (_0x4e8da2) {
          if (_0x4e8da2) {
            if (_0x4e8da2.status == 1) {
              _0x2e6615.getCode();
            } else {
              _0x2e6615.Toast(_0x4e8da2.msg, "warn");
            }
          }
        });
      });
    },
    getCode() {
      let _0x31a825 = this;
      if (!_0x31a825.newTimer) {
        _0x31a825.count = 60;
        _0x31a825.show = false;
        _0x31a825.newTimer = setInterval(function () {
          if (_0x31a825.count > 0 && _0x31a825.count <= 60) {
            _0x31a825.count--;
          } else {
            _0x31a825.show = true;
            clearInterval(_0x31a825.newTimer);
            _0x31a825.newTimer = null;
          }
        }, 1000);
      }
    },
    getForgetCode() {
      let _0x53f234 = this;
      if (!_0x53f234.forgetTimer) {
        _0x53f234.forgetCount = 60;
        _0x53f234.forgetShow = false;
        _0x53f234.forgetTimer = setInterval(function () {
          if (_0x53f234.forgetCount > 0 && _0x53f234.forgetCount <= 60) {
            _0x53f234.forgetCount--;
          } else {
            _0x53f234.forgetShow = true;
            clearInterval(_0x53f234.forgetTimer);
            _0x53f234.forgetTimer = null;
          }
        }, 1000);
      }
    },
    forget() {
      const _0xd7b2d7 = this;
      if (_0xd7b2d7.isForget) {
        return;
      }
      _0xd7b2d7.isForget = true;
      _0xd7b2d7.animateCSS(".forgetBtn", "loginButtonAni");
      let _0x4aeca5 = _0xd7b2d7.forgetEmail;
      let _0x46e20a = _0xd7b2d7.forgetCode;
      let _0x177bb6 = _0xd7b2d7.forgetPasswd;
      let _0x28e9d2 = _0xd7b2d7.forgetRePasswd;
      if (_0x4aeca5 == "") {
        _0xd7b2d7.Toast(_0xd7b2d7.$t("lang.emailinputerror"), "warn");
        _0xd7b2d7.isForget = false;
        return;
      }
      if (_0x46e20a.length < 6) {
        _0xd7b2d7.Toast(_0xd7b2d7.$t("lang.incorrectverificationcodeinput"), "warn");
        _0xd7b2d7.isForget = false;
        return;
      }
      if (_0x177bb6.length < 8) {
        _0xd7b2d7.Toast(_0xd7b2d7.$t("lang.passwordlengtherr"), "warn");
        _0xd7b2d7.isForget = false;
        return;
      }
      if (_0x28e9d2 !== _0x177bb6) {
        _0xd7b2d7.Toast(_0xd7b2d7.$t("lang.confirmationpassworddoesnotmatchthepassword"), "warn");
        _0xd7b2d7.isForget = false;
        return;
      }
      fetch(_0xd7b2d7.url + "api/v1/app/appforget", {
        method: "POST",
        headers: {
          Accept: "application/json, text/javascript, */*; q=0.01",
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: "email=" + _0x4aeca5 + "&email_code=" + _0x46e20a + "&password=" + _0x28e9d2
      }).then(function (_0x323d17) {
        _0xd7b2d7.isForget = false;
        _0x323d17.json().then(function (_0x4b71c2) {
          if (_0x4b71c2) {
            if (_0x4b71c2.status == 1) {
              _0xd7b2d7.isShowForgetSuccess = true;
              _0xd7b2d7.hideForget();
              _0xd7b2d7.forgetEmail = "";
              _0xd7b2d7.forgetCode = "";
              _0xd7b2d7.forgetPasswd = "";
              _0xd7b2d7.forgetRePasswd = "";
            } else {
              _0xd7b2d7.Toast(_0x4b71c2.msg, "warn");
            }
          }
        });
      });
    },
    forgetSms() {
      const _0x2c625c = this;
      if (_0x2c625c.isSend) {
        return;
      }
      _0x2c625c.isSend = true;
      _0x2c625c.animateCSS(".newForget .getEmailCode", "loginButtonAni");
      if (_0x2c625c.forgetEmail == "") {
        _0x2c625c.Toast(_0x2c625c.$t("lang.emailinputerror"), "warn");
        _0x2c625c.isSend = false;
        return;
      }
      fetch(_0x2c625c.url + "api/v1/app/appsendEmailVerify", {
        method: "POST",
        headers: {
          Accept: "application/json, text/javascript, */*; q=0.01",
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: "email=" + _0x2c625c.forgetEmail
      }).then(function (_0x4a6968) {
        _0x2c625c.isSend = false;
        _0x4a6968.json().then(function (_0x3eaff2) {
          if (_0x3eaff2) {
            console.log(_0x3eaff2);
            if (_0x3eaff2.status == 1) {
              _0x2c625c.getForgetCode();
            } else {
              _0x2c625c.Toast(_0x3eaff2.msg, "warn");
            }
          }
        });
      });
    },
    register() {
      let _0x508cbd = this;
      if (_0x508cbd.isRegistering) {
        return;
      }
      _0x508cbd.animateCSS(".registerBtn", "loginButtonAni");
      _0x508cbd.isRegistering = true;
      if (_0x508cbd.signEmail == "") {
        _0x508cbd.Toast(_0x508cbd.$t("lang.emailinputerror"), "warn");
        _0x508cbd.isRegistering = false;
        return;
      }
      if (_0x508cbd.isEmailVerify) {
        if (_0x508cbd.signCode == "") {
          _0x508cbd.Toast(_0x508cbd.$t("lang.incorrectverificationcodeinput"), "warn");
          _0x508cbd.isRegistering = false;
          return;
        }
      }
      if (_0x508cbd.signPasswd == "") {
        _0x508cbd.Toast(_0x508cbd.$t("lang.passwordinputerror"), "warn");
        _0x508cbd.isRegistering = false;
        return;
      }
      if (_0x508cbd.signPasswd.length < 8 || _0x508cbd.signPasswd.length < 8) {
        _0x508cbd.Toast(_0x508cbd.$t("lang.passwordlengtherr"), "warn");
        _0x508cbd.isRegistering = false;
        return;
      }
      if (_0x508cbd.signRepasswd == "") {
        _0x508cbd.Toast(_0x508cbd.$t("lang.passwordinputerror"), "warn");
        _0x508cbd.isRegistering = false;
        return;
      }
      if (_0x508cbd.signRepasswd != _0x508cbd.signPasswd) {
        _0x508cbd.Toast(_0x508cbd.$t("lang.confirmationpassworddoesnotmatchthepassword"), "warn");
        _0x508cbd.isRegistering = false;
        return;
      }
      if (_0x508cbd.isNeedInvite) {
        if (_0x508cbd.signInviteCode == "" || _0x508cbd.signInviteCode == null) {
          _0x508cbd.Toast(_0x508cbd.$t("lang.invitation_code_was_entered_incorrectly"), "warn");
          _0x508cbd.isRegistering = false;
          return;
        }
      }
      fetch(_0x508cbd.url + "api/v1/app/appregister", {
        method: "POST",
        headers: {
          Accept: "application/json, text/javascript, */*; q=0.01",
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: "email=" + _0x508cbd.signEmail + "@" + _0x508cbd.signEmailSelect + "&password=" + _0x508cbd.signRepasswd + "&email_code=" + _0x508cbd.signCode + "&invite_code=" + _0x508cbd.signInviteCode
      }).then(_0x24c84f => {
        try {
          return _0x24c84f.json();
        } catch (_0x18a39c) {}
        return _0x24c84f.text();
      }).then(_0x3693dd => {
        _0x508cbd.isRegistering = false;
        if (_0x3693dd.status == 1) {
          _0x508cbd.showSign = false;
          _0x508cbd.isShowSuccessText = "账户注册完成";
          _0x508cbd.isRegistering = false;
          _0x508cbd.isShowSuccess = true;
        } else {
          _0x508cbd.Toast(_0x3693dd.msg, "warn");
          _0x508cbd.isRegistering = false;
        }
      }).catch(_0x3b7c6f => {
        _0x508cbd.isRegistering = false;
      });
    },
    backNodelist() {
      const _0x43f69a = this;
      _0x43f69a.isShownodeList = false;
    },
    backNews() {
      const _0xa6a84a = this;
      _0xa6a84a.isShowNews = false;
    },
    backAbout() {
      const _0x4591ac = this;
      _0x4591ac.isShowAbout = false;
    },
    backPreferences() {
      const _0x6c2c30 = this;
      _0x6c2c30.isShowPreferences = false;
      _0x6c2c30.animateCSS(".langCard", "loginButtonAni");
      _0x6c2c30.langsHeight = 60;
      _0x6c2c30.colorsHeight = 60;
    },
    backKnow() {
      const _0x4c2974 = this;
      _0x4c2974.isShowknowledge = false;
      $(".tosGuideList").css({
        height: "55px"
      });
      $(".tosGuideList svg").css({
        transform: "rotate(0)"
      });
      _0x4c2974.isShow = "";
    },
    hideMenuIco(_0x542307) {
      const _0x266df8 = this;
      switch (_0x542307) {
        case "orders":
          ;
          _0x266df8.isOrderRecords = false;
          _0x266df8.currentPage = 1;
          break;
        case "invite":
          ;
          _0x266df8.showAccountInvite = false;
          _0x266df8.currentPage = 1;
          break;
        case "profile":
          _0x266df8.isShowprofileList = "";
          break;
        case "about":
          _0x266df8.isShowAbout = false;
          break;
        case "tos":
          _0x266df8.isShowTos = "";
          break;
        case "news":
          _0x266df8.isShowNews = false;
          break;
        case "knowledge":
          ;
          _0x266df8.isShowknowledge = false;
          $(".tosGuideList").css({
            height: "55px"
          });
          $(".tosGuideList svg").css({
            transform: "rotate(0)"
          });
          _0x266df8.isShow = "";
          break;
        case "privacy":
          _0x266df8.isShowPrivacy = "";
          break;
        case "nodelist":
          ;
          _0x266df8.isShownodeList = false;
          _0x266df8.isPing = false;
          break;
        case "store":
          _0x266df8.isShowStore = "";
          break;
        case "exit":
          _0x266df8.isShownewExit = false;
          break;
        default:
          console.log(true);
      }
    },
    hideMenu() {
      const _0x13e57f = this;
      _0x13e57f.isShowMenuRight = "";
      setTimeout(function () {
        _0x13e57f.isShowMenu = "";
      }, 100);
    },
    showMenu() {
      const _0x298c40 = this;
      _0x298c40.isShowMenu = "newshowLeftMenu";
      setTimeout(function () {
        _0x298c40.isShowMenuRight = "testani2";
      }, 300);
    },
    isTimestampExpired(_0x1cb01c, _0x5ef2ec) {
      var _0x264ef3 = new Date().getTime();
      var _0x4f8376 = _0x264ef3 - _0x1cb01c;
      var _0x16639d = Math.floor(_0x4f8376 / 1000 / 60);
      return _0x16639d > _0x5ef2ec;
    },
    changeTab(_0x22a4e5) {
      const _0x2d34c2 = this;
      switch (_0x22a4e5) {
        case "home":
          ;
          _0x2d34c2.isShowknowledge = false;
          _0x2d34c2.isShowPreferences = false;
          _0x2d34c2.isNetwork_proxy_settings = false;
          _0x2d34c2.isShowAbout = false;
          _0x2d34c2.isStore = false;
          _0x2d34c2.showAccountInvite = false;
          _0x2d34c2.isShowPlanInfo = false;
          _0x2d34c2.isOrderRecords = false;
          _0x2d34c2.tabIndex = "home";
          _0x2d34c2.isShowAccount = false;
          _0x2d34c2.isShowMore = false;
          _0x2d34c2.isShowHome = true;
          _0x2d34c2.setUpdate();
          break;
        case "account":
          ;
          _0x2d34c2.isShowNews = false;
          _0x2d34c2.isShowknowledge = false;
          _0x2d34c2.isShowPreferences = false;
          _0x2d34c2.isNetwork_proxy_settings = false;
          _0x2d34c2.isShowAbout = false;
          _0x2d34c2.isShownodeList = false;
          _0x2d34c2.tabIndex = "account";
          _0x2d34c2.isShowHome = false;
          _0x2d34c2.isShowMore = false;
          _0x2d34c2.isShowAccount = true;
          _0x2d34c2.setUpdate();
          _0x2d34c2.lastRefreshTime = localStorage.getItem("lastRefreshTime");
          if (_0x2d34c2.lastRefreshTime == null || _0x2d34c2.lastRefreshTime === "") {
            _0x2d34c2.testMsg = "lastRefreshTime NULL ";
            if (!_0x2d34c2.isUpdateData) {
              _0x2d34c2.update();
              _0x2d34c2.initConfig();
            }
          } else {
            var _0x5b4071 = _0x2d34c2.isTimestampExpired(parseInt(_0x2d34c2.lastRefreshTime), 1);
            if (_0x5b4071) {
              _0x2d34c2.testMsg = "lastRefreshTime 超过2分钟:";
              if (!_0x2d34c2.isUpdateData) {
                _0x2d34c2.update();
                _0x2d34c2.initConfig();
              }
            } else {
              _0x2d34c2.testMsg = "lastRefreshTime 未超过2分钟";
              console.log("less than 2m");
            }
          }
          if (_0x2d34c2.accountExpire != "") {
            if (_0x2d34c2.isExpired(_0x2d34c2.accountExpire)) {
              _0x2d34c2.isShowAccountExp = true;
              _0x2d34c2.isAccountExp = true;
              if (_0x2d34c2.isStart) {
                _0x2d34c2.sendMess("stopProxy", {
                  name: "stopProxy"
                });
                _0x2d34c2.isStart = false;
                _0x2d34c2.Reset();
              }
            } else {
              _0x2d34c2.isShowAccountExp = false;
              _0x2d34c2.isAccountExp = false;
            }
          }
          break;
        case "more":
          ;
          _0x2d34c2.isShowNews = false;
          _0x2d34c2.isStore = false;
          _0x2d34c2.showAccountInvite = false;
          _0x2d34c2.isOrderRecords = false;
          _0x2d34c2.isShowPlanInfo = false;
          _0x2d34c2.isShownodeList = false;
          _0x2d34c2.tabIndex = "more";
          _0x2d34c2.isShowHome = false;
          _0x2d34c2.isShowAccount = false;
          _0x2d34c2.isShowMore = true;
          break;
        default:
          console.log("");
      }
    },
    changeMenuItem(_0x1458b6) {
      const _0x89132a = this;
      const _0x440df6 = window.localStorage;
      const _0x16c870 = JSON.parse(_0x440df6.getItem("APP_DATA_USER"));
      if (_0x1458b6 === "store") {
        _0x89132a.getPaymentMethod();
        _0x89132a.getAppPlans();
        _0x89132a.isAppAlert = false;
        _0x89132a.isShowAccountExp = false;
        _0x89132a.isShowAccountTrafficExhausted = false;
        _0x89132a.isStore = true;
      } else {
        _0x89132a.hideMenu();
      }
      switch (_0x1458b6) {
        case "chat":
          _0x89132a.animateCSS(".chatBtn", "loginButtonAni");
          if (_0x89132a.chatType == "" || _0x89132a.chatType == null) {
            _0x89132a.Toast(_0x89132a.$t("lang.Not_configured_for_online_customer_service"), "warn");
            return;
          }
          if (_0x89132a.chatType === "crisp") {
            if (!_0x89132a.isCrisp) {
              _0x89132a.Toast("Crisp客服系统加载中", "warn");
              return;
            }
            $crisp.push(["do", "chat:open"]);
            $crisp.push(["do", "chat:show"]);
            $(".crisp-client").removeClass("isHide");
            setTimeout(function () {
              $("#crisp-chatbox").attr("data-full-view", "true");
              $($("#crisp-chatbox").get(0).firstChild.firstChild).css({
                width: ""
              });
              $($("#crisp-chatbox").get(0).firstChild.firstChild.nextSibling).remove();
            }, 100);
            return;
          }
          if (_0x89132a.chatLink === "" || _0x89132a.chatLink == null) {
            _0x89132a.Toast(_0x89132a.$t("lang.Not_configured_for_online_customer_service"), "warn");
            return;
          }
          let _0x5411c9 = "";
          _0x89132a.isAlert = true;
          _0x89132a.isWebStore = true;
          _0x89132a.isShowLoading = true;
          _0x89132a.storeLink = _0x89132a.chatLink;
          setTimeout(function () {
            _0x89132a.isAlert = false;
            _0x89132a.isShowLoading = false;
            const _0x1e1ab6 = document.getElementById("storeWeb");
            const _0x1df6d5 = () => {
              console.log("view loading");
              if (_0x5411c9 == "") {
                _0x89132a.isShowLoading = true;
                _0x5411c9 = "loading";
              }
            };
            const _0x2af9aa = () => {
              _0x89132a.isAlert = false;
              _0x89132a.isShowLoading = false;
              console.log("view show");
              _0x1e1ab6.insertCSS("html::-webkit-scrollbar{ display: none !important; };");
            };
            _0x1e1ab6.addEventListener("did-start-loading", _0x1df6d5);
            _0x1e1ab6.addEventListener("did-stop-loading", _0x2af9aa);
          }, 3000);
          break;
        case "theme":
          ;
          _0x89132a.isShowPreferences = true;
          setTimeout(function () {
            HSThemeSwitch.autoInit();
          }, 100);
          break;
        case "orders":
          ;
          _0x89132a.isOrderRecords = true;
          _0x89132a.getOrders();
          break;
        case "update":
          if (_0x89132a.isUpdateData) {
            return;
          }
          _0x89132a.update();
          break;
        case "profile":
          ;
          _0x89132a.isShowprofileList = "showprofileList";
          _0x89132a.isShowAbout = false;
          _0x89132a.isShowTos = "";
          _0x89132a.isShowNews = "";
          _0x89132a.isShowknowledge = false;
          _0x89132a.isShownodeList = false;
          _0x89132a.isShowPrivacy = "";
          _0x89132a.isShowStore = "";
          _0x89132a.isShownewExit = false;
          break;
        case "about":
          ;
          _0x89132a.isShowAbout = true;
          _0x89132a.isShowNews = "";
          _0x89132a.isShowknowledge = false;
          _0x89132a.isShowprofileList = "";
          _0x89132a.isShowTos = "";
          _0x89132a.isShownodeList = false;
          _0x89132a.isShowPrivacy = "";
          _0x89132a.isShowStore = "";
          _0x89132a.isShownewExit = false;
          break;
        case "tos":
          _0x89132a.isShowTos = "showprofileList";
          break;
        case "news":
          ;
          _0x89132a.isShowNews = "showprofileList";
          _0x89132a.isShowknowledge = false;
          _0x89132a.isShowprofileList = "";
          _0x89132a.isShowAbout = false;
          _0x89132a.isShowTos = "";
          _0x89132a.isShownodeList = false;
          _0x89132a.isShowPrivacy = "";
          _0x89132a.isShowStore = "";
          _0x89132a.isShownewExit = false;
          break;
        case "knowledge":
          ;
          _0x89132a.isShowknowledge = true;
          _0x89132a.isShownewExit = false;
          if (_0x16c870) {
            _0x89132a.initSupportFile();
          }
          break;
        case "nodelist":
          ;
          _0x89132a.isShownodeList = true;
          _0x89132a.isShowAbout = false;
          _0x89132a.isShowNews = "";
          _0x89132a.isShowknowledge = false;
          _0x89132a.isShowprofileList = "";
          _0x89132a.isShowTos = "";
          _0x89132a.isShowPrivacy = "";
          _0x89132a.isShowStore = "";
          _0x89132a.isShownewExit = false;
          break;
        case "privacy":
          _0x89132a.isShowPrivacy = "showprofileList";
          break;
        case "exit":
          ;
          _0x89132a.isShownewExit = true;
          _0x89132a.isShowAbout = false;
          _0x89132a.isShowNews = "";
          _0x89132a.isShowknowledge = false;
          _0x89132a.isShowprofileList = "";
          _0x89132a.isShowTos = "";
          _0x89132a.isShownodeList = false;
          _0x89132a.isShowPrivacy = "";
          _0x89132a.isShowStore = "";
          break;
        case "restore":
          break;
        default:
          console.log(true);
      }
    },
    goStore() {
      const _0x5ce875 = this;
      _0x5ce875.isAlert = true;
      const _0x15c429 = window.localStorage;
      const _0x2d3576 = JSON.parse(_0x15c429.getItem("APP_DATA_USER"));
      let _0x6e2c0f = _0x2d3576.email;
      let _0x3eea27 = _0x2d3576.passwd;
      let _0x1aaac4 = "";
      if (_0x5ce875.panelType == "sspanel") {
        _0x5ce875.isWebStore = true;
        _0x5ce875.isShowLoading = true;
        _0x5ce875.storeLink = _0x5ce875.weburl + "api/v1/app/apptoken?email=" + _0x6e2c0f + "&password=" + _0x3eea27;
        console.log(_0x5ce875.storeLink);
        setTimeout(function () {
          _0x5ce875.isAlert = false;
          const _0x5da209 = document.getElementById("storeWeb");
          const _0x1b19ad = () => {
            console.log("view loading");
            if (_0x1aaac4 == "") {
              _0x5ce875.isShowLoading = true;
              _0x1aaac4 = "loading";
            }
          };
          const _0x585857 = () => {
            _0x5ce875.isAlert = false;
            _0x5ce875.isShowLoading = false;
            console.log("view show");
            _0x5da209.insertCSS("html::-webkit-scrollbar{ display: none !important; };");
            _0x5da209.insertCSS("header { display: none !important; };");
          };
          _0x5da209.addEventListener("did-start-loading", _0x1b19ad);
          _0x5da209.addEventListener("did-stop-loading", _0x585857);
        }, 3000);
        return;
      }
      fetch(_0x5ce875.url + "api/v1/app/getTempToken", {
        method: "POST",
        headers: {
          Accept: "application/json, text/javascript, */*; q=0.01",
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: "token=" + _0x5ce875.user.token
      }).then(function (_0x3c3fdf) {
        _0x3c3fdf.json().then(function (_0x5016d9) {
          _0x5ce875.isAlert = false;
          _0x5ce875.isWebStore = true;
          if (_0x5016d9.data) {
            _0x5ce875.storeLink = _0x5ce875.url + "api/v1/app/homepage?token=" + _0x5016d9.data + "&redirect=plan";
            const _0x2aa11e = document.getElementById("storeWeb");
            const _0x39ce7e = () => {
              console.log("view loading");
              if (_0x1aaac4 == "") {
                _0x5ce875.isShowLoading = true;
                _0x1aaac4 = "loading";
              }
            };
            const _0x320054 = () => {
              _0x5ce875.isAlert = false;
              _0x5ce875.isShowLoading = false;
              console.log("view show");
              _0x2aa11e.insertCSS("html::-webkit-scrollbar{ display: none !important; };");
              _0x2aa11e.insertCSS("header { display: none !important; };");
            };
            setTimeout(function () {
              _0x2aa11e.addEventListener("did-start-loading", _0x39ce7e);
              _0x2aa11e.addEventListener("did-stop-loading", _0x320054);
            }, 500);
          }
        });
      });
    },
    showpass(_0xef1044) {
      const _0x31354f = this;
      if (_0xef1044 == "show") {
        _0x31354f.isShowPass = true;
        _0x31354f.passtype = "text";
      } else {
        _0x31354f.isShowPass = false;
        _0x31354f.passtype = "password";
      }
    },
    login() {
      const _0x40ee67 = this;
      const _0x40a660 = window.localStorage;
      function _0x37542f(_0x2cd285) {
        var _0x1508f9 = JSON.stringify(_0x2cd285);
        _0x40a660.setItem("APP_DATA_USER", _0x1508f9);
        _0x40ee67.setUpdate();
      }
      _0x40ee67.animateCSS(".loginformBtn", "loginButtonAni");
      if (_0x40ee67.isLoging) {
        return;
      }
      _0x40ee67.isLoging = true;
      if (_0x40ee67.loginEmail == "" || _0x40ee67.loginEmail == null) {
        _0x40ee67.Toast(_0x40ee67.$t("lang.emailinputerror"), "warn");
        _0x40ee67.isLoging = false;
        return;
      }
      if (_0x40ee67.loginPasswd == "" || _0x40ee67.loginPasswd == null) {
        _0x40ee67.Toast(_0x40ee67.$t("lang.passwordinputerror"), "warn");
        _0x40ee67.isLoging = false;
        return;
      }
      if (_0x40ee67.loginPasswd.length < 8) {
        _0x40ee67.Toast(_0x40ee67.$t("lang.passwordinputerror"), "warn");
        _0x40ee67.isLoging = false;
        return;
      }
      var _0x54c5c5 = Date.parse(new Date());
      fetch(_0x40ee67.url + "api/v1/app/applogin?time=" + _0x54c5c5, {
        method: "POST",
        headers: {
          Accept: "application/json, text/javascript, */*; q=0.01",
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: "email=" + _0x40ee67.loginEmail + "&password=" + _0x40ee67.loginPasswd + "&v=" + _0x40ee67.appVersion
      }).then(_0x110c00 => {
        try {
          return _0x110c00.json();
        } catch (_0x6c7cc6) {}
        return _0x110c00.text();
      }).then(_0x19fbdb => {
        _0x40ee67.isLoging = false;
        if (_0x19fbdb.status == 1) {
          const _0xdf150f = {
            email: _0x40ee67.loginEmail,
            passwd: _0x40ee67.loginPasswd,
            accountID: _0x19fbdb.id,
            expire: _0x19fbdb.expired,
            plan: _0x19fbdb.planName,
            conf: _0x19fbdb.conf,
            link: _0x19fbdb.link,
            residue: _0x19fbdb.residue,
            userTf: _0x19fbdb.usedTraffic,
            tfPercentage: _0x19fbdb.tfPercentage,
            accountdays: _0x19fbdb.days,
            code: _0x19fbdb.code,
            token: _0x19fbdb.token,
            transferEnable: _0x19fbdb.transfer_enable,
            useTf: _0x19fbdb.useTf,
            web: _0x19fbdb.web,
            configs: _0x19fbdb.configs,
            configsNodes: _0x19fbdb.configsNodes,
            chatLink: _0x19fbdb.chatLink
          };
          const _0x532083 = _0xdf150f;
          const _0x204345 = _0x532083;
          _0x37542f(_0x204345);
          _0x40ee67.init("login");
          _0x40ee67.Toast("登录成功", "success");
          _0x40ee67.isLoging = false;
        } else {
          if (_0x19fbdb.msg) {
            _0x40ee67.Toast(_0x19fbdb.msg, "warn");
          } else {
            _0x40ee67.Toast(_0x19fbdb.reason, "warn");
          }
          _0x40ee67.isLoging = false;
        }
      }).catch(_0x253d65 => {
        _0x40ee67.isLoging = false;
      });
    },
    hideSuccessPage() {
      const _0x301d1a = this;
      _0x301d1a.goLogin();
      _0x301d1a.isShowLogin = true;
      _0x301d1a.isShowSuccess = false;
    },
    goForget() {
      const _0x5a48a7 = this;
      _0x5a48a7.isShowLogin = false;
      _0x5a48a7.isShowForget = true;
      setTimeout(function () {
        HSStrongPassword.autoInit();
      }, 100);
    },
    hideForget() {
      const _0xaa5a53 = this;
      _0xaa5a53.isShowForget = false;
      _0xaa5a53.isShowLogin = true;
    },
    goSign() {
      const _0x363db3 = this;
      _0x363db3.isShowLogin = false;
      _0x363db3.showSign = true;
      _0x363db3.isShowLogin = true;
      setTimeout(function () {
        HSStrongPassword.autoInit();
      }, 100);
    },
    goLogin() {
      const _0x46f3eb = this;
      _0x46f3eb.showSign = false;
    },
    Toast(_0x3a632f, _0x346c91) {
      let _0x4506f4 = this;
      _0x4506f4.isShowToast = true;
      _0x4506f4.ToastText = _0x3a632f;
      _0x4506f4.ToastType = _0x346c91;
      setTimeout(function () {
        _0x4506f4.isShowToast = false;
      }, 2000);
    }
  }
};
const _0x5b2adf = {
  messages: languagepack
};
const _0x5255b5 = _0x5b2adf;
const i18n = new VueI18n(_0x5255b5);
var Ctor = Vue.extend(Main);
const _0x36c4e0 = {
  i18n: i18n
};
const _0x15f587 = _0x36c4e0;
new Ctor(_0x15f587).$mount("#app");