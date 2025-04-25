import about1 from "../../assets/images/about1.svg";
import about2 from "../../assets/images/about2.svg";
import about3 from "../../assets/images/about3.svg";
import reason1 from "../../assets/images/reason1.svg";
import reason2 from "../../assets/images/reason2.svg";
import reason3 from "../../assets/images/reason3.svg";
import reason4 from "../../assets/images/reason4.svg";
import reason5 from "../../assets/images/reason5.svg";
import reason6 from "../../assets/images/reason6.svg";

const AboutUsPage = () => {
  const options = [
    {
      img: about1,
      title: "Chất liệu cao cấp & Bền bỉ",
      content:
        "Sản phẩm được làm từ chất liệu chất lượng cao, thân thiện với làn da và bền bỉ theo thời gian – từ vải thoáng khí, co giãn tốt đến giày thể thao đế êm, hỗ trợ vận động tối đa.",
    },
    {
      img: about2,
      title: "Thiết kế hiện đại & Đậm chất riêng",
      content:
        "Trang phục được thiết kế năng động, cá tính, phù hợp với nhiều phong cách tập luyện và thời trang thể thao. Có thể lựa chọn màu sắc, size và kiểu dáng phù hợp với bạn nhất.",
    },
    {
      img: about3,
      title: "Giao hàng nhanh chóng & An toàn",
      content:
        "Đóng gói kỹ lưỡng, vận chuyển nhanh toàn quốc. Đảm bảo sản phẩm đến tay bạn nguyên vẹn, đúng hẹn – mang đến trải nghiệm mua sắm thể thao tiện lợi và chuyên nghiệp.",
    },
  ];

  const reasons = [
    {
      img: reason1,
      title: "Giá trị cốt lõi",
      content:
        "Tại WTM Sport, chúng mình luôn coi khách hàng như người bạn thân thiết, mang đến những sản phẩm và dịch vụ vượt trội.",
    },
    {
      img: reason2,
      title: "Tầm nhìn và sứ mệnh",
      content:
        "Với phương châm luôn đề cao sự trải nghiêm, chúng tôi không ngừng cố gắng để cải thiện chất lượng sản phẩm và dịch vụ dành cho khách hàng.",
    },
    {
      img: reason3,
      title: "Thế mạnh của chúng mình",
      content:
        "Chúng mình tự hào về sự đa dạng sản phẩm, dịch vụ chuyên nghiệp và tận tình tại WTM Sport.",
    },
    {
      img: reason4,
      title: "Hỗ trợ 24/7",
      content:
        "Chúng mình sẵn lòng hỗ trợ khách hàng mọi lúc, mọi nơi. Đừng ngần ngại liên hệ với chúng mình bất cứ khi nào bạn cần.",
    },
    {
      img: reason5,
      title: "Chính sách đổi trả",
      content:
        "Bạn có thể yên tâm mua sắm tại WTM Sport vì chúng mình chấp nhận đổi trả trong vòng 14 ngày kể từ ngày mua hàng.",
    },
    {
      img: reason6,
      title: "Bảo mật thông tin",
      content:
        "Chúng mình cam kết tuân thủ các quy định pháp luật về bảo vệ dữ liệu và sử dụng thông tin cá nhân của khách hàng một cách cẩn thận và công bằng.",
    },
  ];
  return (
    <div className="container mx-auto flex flex-col items-center py-10 px-2">
      <section>
        <h1 className="text-4xl font-semibold uppercase text-primary text-center">
          WTM Sport - Về chúng tôi
        </h1>
        <div className="flex justify-center py-7">
          <div className="h-[2px] w-[30%] bg-black"></div>
        </div>
        <p className="text-center text-xl font-bold">
          Chào mừng bạn đến với <strong>WTM Sport</strong> – Nơi hội tụ những
          trang phục và phụ kiện thể thao chất lừ, giúp bạn bứt phá giới hạn và
          thể hiện chất riêng trên mọi hành trình!
        </p>
        <div className="flex justify-evenly flex-wrap lg:flex-nowrap py-10">
          {options.map((option, index) => (
            <div
              key={index}
              className="flex flex-col items-center py-5 lg:py-0"
            >
              <img src={option.img} alt={option.title} className="w-20 h-20" />
              <p className="font-bold text-lg my-3 text-center">
                {option.title}
              </p>
              <p className="text-center">{option.content}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="pb-10">
        <h2 className="text-4xl font-semibold uppercase text-primary text-center">
          Thế giới thể thao
        </h2>
        <div className="flex justify-center py-7">
          <div className="h-[2px] w-[30%] bg-black"></div>
        </div>
        <p className="text-justify text-lg">
          Tại <strong>WTM Sport</strong>, chúng mình tin rằng thể thao không chỉ
          là hoạt động rèn luyện sức khỏe, mà còn là cách bạn thể hiện bản lĩnh,
          cá tính và tinh thần sống tích cực. Với niềm đam mê thể thao và mong
          muốn mang đến những sản phẩm chất lượng từ các thương hiệu uy tín,{" "}
          <strong>WTM Sport</strong> tự hào là nơi cung cấp đồ thể thao chính
          hãng đa dạng, hiện đại và đầy cảm hứng, giúp bạn tự tin chinh phục mọi
          giới hạn mỗi ngày. <br />
          <br />
          Mỗi bộ đồ hay phụ kiện thể thao đều mang một thông điệp riêng. Vì vậy,
          tại <strong>WTM Sport</strong>, các sản phẩm đều được chọn lọc kỹ
          lưỡng về nguồn gốc, chất lượng và thương hiệu – đảm bảo đáp ứng cả về
          tính thời trang lẫn hiệu năng sử dụng. Dù bạn theo đuổi phong cách
          năng động, khỏe khoắn hay trẻ trung, cá tính, chúng mình đều có sản
          phẩm phù hợp với gu thẩm mỹ và nhu cầu tập luyện của bạn. <br />
          <br />
          <strong>WTM Sport</strong> thường xuyên cập nhật các bộ sưu tập mới từ
          các thương hiệu thể thao nổi tiếng trong và ngoài nước, giúp bạn dễ
          dàng tìm thấy sản phẩm yêu thích, chính hãng và bắt kịp xu hướng.{" "}
          <br />
          <br />
          Nếu bạn đang tìm kiếm một địa chỉ uy tín để sở hữu trang phục, giày
          dép hay phụ kiện thể thao chính hãng, hãy đến với{" "}
          <strong>WTM Sport</strong> – nơi mang đến trải nghiệm mua sắm chuyên
          nghiệp và truyền cảm hứng cho lối sống năng động, khỏe mạnh. <br />
          <br />
          Thế mạnh của chúng mình là sự đa dạng về sản phẩm và sự am hiểu sâu
          sắc về nhu cầu của người yêu thể thao. Đội ngũ nhân viên{" "}
          <strong>WTM Sport</strong> luôn sẵn sàng hỗ trợ và tư vấn tận tình,
          giúp bạn lựa chọn sản phẩm phù hợp nhất với bộ môn, mục tiêu và ngân
          sách của mình. <br />
          <br />
          Không chỉ là một cửa hàng bán đồ thể thao, <strong>
            WTM Sport
          </strong>{" "}
          còn là nơi kết nối cộng đồng yêu thể thao. Chúng mình chia sẻ những
          kiến thức hữu ích về lựa chọn sản phẩm, cách sử dụng và bảo quản thiết
          bị thể thao. Bên cạnh đó, <strong>WTM Sport</strong> cam kết mang đến
          mức giá hợp lý và sản phẩm chính hãng chất lượng, để mỗi khách hàng
          đều an tâm và hài lòng khi mua sắm tại đây. <br />
          <br />
          Uy tín, chất lượng dịch vụ và sự chuyên nghiệp chính là điều khiến{" "}
          <strong>WTM Sport</strong> trở thành điểm đến yêu thích của những ai
          đam mê thể thao. Hãy để <strong>WTM Sport</strong> đồng hành cùng bạn
          trên hành trình bứt phá giới hạn và sống trọn đam mê mỗi ngày!
        </p>
      </section>
      <section>
        <h2 className="text-4xl font-semibold uppercase text-primary text-center">
          Tại sao nên chọn WTM Sport
        </h2>
        <div className="flex justify-center py-7">
          <div className="h-[2px] w-[30%] bg-black"></div>
        </div>
        <div className="grid grid-cols-2 gap-5 py-10">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="flex flex-col items-center bg-[#FFD2D8] p-5 rounded-md"
            >
              <img src={reason.img} alt={reason.title} />
              <p className="font-bold text-lg my-3 text-center">
                {reason.title}
              </p>
              <p className="text-center">{reason.content}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;
