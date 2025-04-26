const PrivatePolicyPage = () => {
    const policies = [
        {
            title: "Giới thiệu",
            content:
                "Việc thu thập dữ liệu chủ yếu trên website WTM Sport bao gồm: email, điện thoại, địa chỉ khách hàng. Đây là các thông tin mà WTM Sport cần khách hàng cung cấp bắt buộc khi sử dụng dịch vụ để liên hệ xác nhận và đảm bảo quyền lợi cho người tiêu dùng trong quá trình mua sắm và giao dịch.",
        },
        {
            title: "Phạm vi sử dụng thông tin",
            content:
                "Công ty sử dụng thông tin khách hàng cung cấp để:\n\n- Cung cấp các sản phẩm và dịch vụ đến khách hàng;\n\n- Gửi các thông báo về hoạt động mua bán và hỗ trợ giữa khách hàng và WTM Sport;\n\n- Liên lạc, chăm sóc khách hàng và giải quyết các tình huống phát sinh nếu có;\n\n- Không sử dụng thông tin cá nhân ngoài mục đích liên hệ và giao dịch với khách hàng tại WTM Sport;\n\n- Trường hợp có yêu cầu từ cơ quan pháp luật: WTM Sport sẽ hợp tác cung cấp thông tin cá nhân khách hàng nếu có yêu cầu từ cơ quan chức năng có thẩm quyền. Ngoài ra, không cá nhân hay tổ chức nào được quyền tiếp cận thông tin cá nhân của khách hàng.",
        },
        {
            title: "Thời gian lưu trữ thông tin",
            content:
                "Dữ liệu cá nhân của khách hàng sẽ được lưu trữ cho đến khi có yêu cầu hủy bỏ hoặc khách hàng yêu cầu xóa thông tin. Trong mọi trường hợp, dữ liệu sẽ được bảo mật trên hệ thống máy chủ của WTM Sport.",
        },
        {
            title: "Địa chỉ của đơn vị thu thập và quản lý thông tin cá nhân",
            content:
                "Cửa hàng kinh doanh trang phục & phụ kiện thể thao WTM Sport\n\n- Địa chỉ: Linh Trung, Thủ Đức, HCM\n\n- Email: wtmsport.contact@gmail.com\n\n- Hotline: 0595 275 688",
        },
        {
            title: "Phương tiện và công cụ để người dùng tiếp cận và chỉnh sửa dữ liệu cá nhân của mình",
            content:
                "Khách hàng có quyền tự kiểm tra, cập nhật, điều chỉnh hoặc yêu cầu WTM Sport xóa thông tin cá nhân của mình.\n\nNếu có bất kỳ khiếu nại nào, khách hàng có thể gửi thông tin đến ban quản trị website WTM Sport để được xác minh và xử lý kịp thời tùy theo mức độ phản ánh.",
        },
        {
            title: "Giải quyết hậu quả do lỗi nhập sai thông tin tại WTM Sport",
            content:
                "Thông tin cá nhân của khách hàng tại WTM Sport được cam kết bảo mật tuyệt đối. Việc thu thập và sử dụng thông tin chỉ được thực hiện khi có sự đồng ý của khách hàng, trừ trường hợp pháp luật có quy định khác.\n\nWTM Sport không chuyển giao hay tiết lộ thông tin khách hàng cho bên thứ ba khi chưa có sự cho phép.\n\nTrong trường hợp máy chủ bị tấn công dẫn đến mất dữ liệu cá nhân, WTM Sport sẽ thông báo ngay đến cơ quan chức năng và khách hàng để cùng xử lý.\n\nMọi giao dịch trực tuyến tại WTM Sport, bao gồm hóa đơn và chứng từ, đều được bảo mật tuyệt đối.\n\nBan quản lý WTM Sport yêu cầu khách hàng cung cấp đầy đủ, chính xác thông tin khi đăng ký mua hàng và không chịu trách nhiệm với các khiếu nại phát sinh từ việc cung cấp sai thông tin cá nhân.",
        },
    ];

    return (
        <div className="container mx-auto flex flex-col py-10 px-2">
            <h1 className="text-4xl font-semibold uppercase text-primary text-center">
                WTM Sport - Chính sách bảo mật
            </h1>
            <div className="flex justify-center py-7">
                <div className="h-[2px] w-[30%] bg-black"></div>
            </div>
            {policies.map((policy, index) => (
                <div key={index}>
                    <h2 className="text-2xl font-bold my-2">
                        {index + 1}. {policy.title}
                    </h2>
                    {policy.content.split("\n").map((line, i) => (
                        <p
                            key={i}
                            className="text-gray-700 text-lg font-[400] mb-2 text-justify"
                        >
                            {line}
                        </p>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default PrivatePolicyPage;