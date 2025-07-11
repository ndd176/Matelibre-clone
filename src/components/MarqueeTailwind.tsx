export default function MarqueeLoop() {
  return (
    <div className="overflow-hidden whitespace-nowrap bg-white w-full py-4">
      <div className="marquee">
        {/* Nhân đôi nội dung để liền mạch */}
        {[...Array(2)].map((_, i) => (
          <span
            key={i}
            className="text-[60px] md:text-[100px] font-studio-pro-bold text-black px-10"
          >
            {'WE\'RE HIRING ✦ '.repeat(10)}
          </span>
        ))}
      </div>
    </div>
  )
}
