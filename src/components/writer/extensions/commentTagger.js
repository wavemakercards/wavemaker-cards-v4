import { Mark, updateMark } from "@tiptap/vue-3";

export default class CommentTagger extends Mark {
    get name() {
        return "commenttagger";
    }

    get defaultOptions() {
        return {
            levels: ["body-green", "body-red", "body-blue"]
        };
    }

    get schema() {
        return {
            attrs: {
                level: {
                    default: "body-green"
                }
            },
            parseDOM: [
                {
                    tag: "span[data-cheese]",
                    getAttrs(dom) {
                        console.log(dom.classList[1]);
                        return { level: 2 };
                    }
                }
            ],
            toDOM: (mark) => {
                return [
                    "span",
                    {
                        "data-cheese": `custom-style ${mark.attrs.level}`,
                        class: `custom-style ${mark.attrs.level}`
                    },
                    0
                ];
            }
        };
    }

    commands({ type }) {
        return (attrs) => updateMark(type, attrs);
    }
}
