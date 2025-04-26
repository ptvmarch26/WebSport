const TermOfUsePage = () => {
    const terms = [
        {
          title: "Giới thiệu",
          content: `Chào mừng quý khách đến với WTM Sport – Thế giới phụ kiện và trang phục thể thao chính hãng, năng động và cá tính.\n\nChúng tôi có địa chỉ giao dịch tại Linh Trung, Thủ Đức, HCM và website chính thức tại www.wtmsport.id.vn.\n\nKhi truy cập website, quý khách đồng ý với các điều khoản sử dụng được nêu dưới đây. WTM Sport có quyền thay đổi, điều chỉnh hoặc cập nhật các điều khoản này bất kỳ lúc nào mà không cần thông báo trước. Việc tiếp tục sử dụng website sau khi có thay đổi đồng nghĩa với việc quý khách chấp nhận các cập nhật đó.\n\nVui lòng kiểm tra thường xuyên để cập nhật các điều khoản mới nhất từ chúng tôi.`,
        },
        {
          title: "Hướng dẫn sử dụng website",
          content:
            "Khách hàng truy cập vào website cần đảm bảo đủ 18 tuổi hoặc có sự giám sát của người giám hộ hợp pháp. Việc mua sắm trên WTM Sport chỉ dành cho người có đầy đủ năng lực hành vi dân sự.\n\nChúng tôi sẽ cung cấp tài khoản (Account) để quý khách thực hiện việc mua sắm trực tuyến. Quý khách cần đăng ký tài khoản với thông tin chính xác và cập nhật khi có thay đổi. Mọi hành vi sử dụng tài khoản là trách nhiệm của người sở hữu.\n\nNghiêm cấm sử dụng website cho các mục đích thương mại trái phép hoặc mạo danh nếu không có sự đồng ý bằng văn bản từ WTM Sport. Vi phạm có thể dẫn đến việc khóa tài khoản mà không cần báo trước.\n\nKhi đăng ký tài khoản, quý khách đồng ý nhận thông tin quảng cáo qua email và có thể hủy bất kỳ lúc nào bằng liên kết trong email.",
        },
        {
          title: "Ý kiến của khách hàng",
          content:
            "Mọi đánh giá, nhận xét của khách hàng khi gửi về cho WTM Sport đều trở thành tài sản của chúng tôi. Chúng tôi có quyền sử dụng các nội dung này cho mục đích cải thiện dịch vụ. Việc sử dụng thông tin giả mạo sẽ bị xử lý nghiêm theo pháp luật.",
        },
        {
          title: "Chấp nhận đơn hàng & Giá cả",
          content:
            "WTM Sport có quyền từ chối hoặc hủy đơn hàng vì các lý do như lỗi hệ thống, sai giá sản phẩm, hoặc nghi ngờ hành vi mua hàng không hợp lệ.\n\nGiá sản phẩm luôn được cập nhật chính xác, tuy nhiên nếu có sai sót, chúng tôi sẽ liên hệ để điều chỉnh hoặc xử lý đơn hàng theo từng trường hợp cụ thể.",
        },
        {
          title: "Thay đổi hoặc hủy bỏ giao dịch",
          content:
            "Khách hàng có thể yêu cầu hủy giao dịch nếu đáp ứng một trong các điều kiện sau:\n\n- Gửi yêu cầu hủy qua hotline 059 527 56 88 hoặc email wtmsport.contact@gmail.vn.\n\n- Trả lại sản phẩm trong tình trạng chưa qua sử dụng và còn nguyên vẹn.",
        },
        {
          title: "Giải quyết hậu quả do lỗi nhập sai thông tin",
          content:
            "Khách hàng cần cung cấp thông tin đầy đủ, chính xác. Trong trường hợp nhập sai thông tin và hệ thống không thể xử lý đơn hàng, WTM Sport có quyền từ chối giao dịch.\n\nNếu lỗi phát sinh do hệ thống hoặc bên thứ ba, WTM Sport sẽ hỗ trợ bằng cách gửi mã giảm giá tương ứng hoặc xử lý linh hoạt theo từng tình huống.",
        },
        {
          title: "Thương hiệu và bản quyền",
          content:
            "Tất cả nội dung trên website (bao gồm thiết kế, hình ảnh, văn bản, mã nguồn, phần mềm…) là tài sản của WTM Sport và được bảo vệ bởi luật bản quyền Việt Nam. Mọi hành vi sao chép hoặc sử dụng trái phép đều bị nghiêm cấm.",
        },
        {
          title: "Quyền pháp lý",
          content:
            "Các điều khoản sử dụng trên website WTM Sport được điều chỉnh bởi pháp luật Việt Nam. Mọi tranh chấp phát sinh sẽ được giải quyết tại tòa án có thẩm quyền tại Việt Nam.",
        },
        {
          title: "Chính sách bảo mật",
          content:
            "WTM Sport cam kết bảo mật tuyệt đối thông tin khách hàng. Tất cả dữ liệu giao dịch đều được mã hóa và lưu trữ an toàn.\n\nCấm mọi hành vi can thiệp trái phép vào hệ thống dữ liệu của website. Người vi phạm có thể bị xử lý theo pháp luật.\n\nThông tin khách hàng chỉ được chia sẻ nếu có yêu cầu từ cơ quan chức năng.",
        },
        {
          title: "Thanh toán an toàn & tiện lợi",
          content:
            "Khách hàng có thể lựa chọn thanh toán bằng các hình thức sau:\n\nCách 1: Thanh toán khi nhận hàng (COD)\nBước 1: Khách xác nhận đơn hàng\nBước 2: WTM Sport giao hàng\nBước 3: Khách thanh toán khi nhận hàng\n\nCách 2: Chuyển khoản / thẻ ngân hàng\nBước 1: Xác nhận đơn hàng\nBước 2: Thanh toán qua ngân hàng hoặc ví điện tử\nBước 3: WTM Sport giao hàng\n\nKhách hàng cần tuân thủ chính sách thanh toán của WTM Sport khi mua hàng.",
        },
        {
          title: "An toàn giao dịch",
          content:
            "Chúng tôi sử dụng các biện pháp kỹ thuật và nghiệp vụ để bảo vệ thông tin giao dịch và đảm bảo mọi giao dịch trên website diễn ra minh bạch, an toàn và hiệu quả.",
        },
        {
          title: "Luật pháp & thẩm quyền tại Việt Nam",
          content:
            "Tất cả điều khoản, điều kiện và giao dịch trên website WTM Sport đều được điều chỉnh và giải thích theo luật pháp Việt Nam. Mọi khiếu nại, tranh chấp phát sinh sẽ được giải quyết tại cơ quan có thẩm quyền trên lãnh thổ Việt Nam.",
        },
      ];
      
  return (
    <div className="container mx-auto flex flex-col py-10 px-2">
      
      <h1 className="text-4xl font-semibold uppercase text-primary text-center">
        WTM Sport - Điều khoản sử dụng
      </h1>
      <div className="flex justify-center py-7">
        <div className="h-[2px] w-[30%] bg-black"></div>
      </div>
      {terms.map((term, index) => (
        <div key={index}>
          <h2 className="text-2xl font-bold my-2">
            {index + 1}. {term.title}
          </h2>
          {term.content.split("\n").map((line, i) => {
            if (line.startsWith("Cách 1") || line.startsWith("Cách 2")) {
              const parts = line.split(":");
              return (
                <p key={i} className="text-gray-700 text-lg font-[400] mb-2">
                  <strong className="underline">{parts[0]}</strong>
                  {parts.length > 1 && `:${parts.slice(1).join(":")}`}
                </p>
              );
            }
            return (
              <p
                key={i}
                className="text-gray-700 text-lg font-[400] mb-2 text-justify"
              >
                {line}
              </p>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default TermOfUsePage;