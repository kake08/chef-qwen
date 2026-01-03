import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'


export default function QwenRecipe(props) {
    const markdown = props.generatedRecipe
    return(
        <section className="suggested-recipe-container"  hidden={!props.recipeShown}>
                <ReactMarkdown children={markdown} remarkPlugins={[remarkGfm]} />
        </section>
    )
}








