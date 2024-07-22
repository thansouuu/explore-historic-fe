import Highlighter from "react-highlight-words";

export const withHighlighter = (content, highlights, callback) => {
    return (
        <Highlighter
        highlightClassName="YourHighlightClass"
        searchWords={highlights.map(hightlight => hightlight.word)}
        autoEscape={true}
        activeIndex={1}
        textToHighlight={content}
        highlightTag={({children, highlightIndex }) => {
            const indexWord = highlights.findIndex(hightlight => hightlight.word.toLowerCase() === children.toLowerCase());
            const image = highlights?.[indexWord]?.image;


            return  (
                
                <strong                                 
                    className="inline relative highlighted-text text-[#be9f76] cursor-pointer" 
                    data-highlight-index={highlightIndex} 
                    onClick={() => callback?.(image)}
                >
                    {children}

                </strong>
                            
            )
        }}
    /> 
    )
}

// anh tham khảo cách này thử xem
// mình đánh dấu cái word có hinh anh lai bang div hoac j do 
// xong xu li voi no if else , cach do khong toi uu code em oi, anh dang tim giai phap toi uu mot xiu
// tai so kho a, 1 doan van cai word trung nhieu lam