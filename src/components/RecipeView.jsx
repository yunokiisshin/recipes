import { Trash2, Pencil } from 'lucide-react'
import IngredientChip from './IngredientChip'

function formatBody(text) {
  return text.split('\n').map((line, i) => (
    <span key={i}>
      {line}
      {i < text.split('\n').length - 1 && <br />}
    </span>
  ))
}

export default function RecipeView({ recipe, onDelete, onEdit }) {
  if (!recipe) {
    return (
      <div className="flex-1 h-full flex items-center justify-center text-brown-muted text-sm px-6 text-center">
        Select a recipe from the sidebar, or add one
      </div>
    )
  }

  return (
    <article className="px-6 md:px-10 py-8 md:py-10 max-w-2xl w-full">
      <div className="flex items-start justify-between mb-2">
        <h1 className="font-serif text-2xl md:text-3xl font-medium text-brown">{recipe.title}</h1>
        <div className="flex items-center gap-1 mt-1">
          <button
            onClick={() => onEdit(recipe)}
            className="p-1.5 rounded-lg text-brown-muted hover:text-amber-warm hover:bg-amber-warm/10 transition-colors"
            title="Edit recipe"
          >
            <Pencil size={15} />
          </button>
          <button
            onClick={() => onDelete(recipe.id)}
            className="p-1.5 rounded-lg text-brown-muted hover:text-red-400 hover:bg-red-50 transition-colors"
            title="Delete recipe"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>

      <div className="w-10 h-0.5 bg-amber-warm/60 mb-7" />

      {recipe.ingredients?.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xs font-semibold tracking-widest uppercase text-brown-muted mb-3">
            What you need
          </h2>
          <div className="flex flex-wrap gap-2">
            {recipe.ingredients.map(({ key, amount }) => (
              <IngredientChip key={key} ingredientKey={key} amount={amount} />
            ))}
          </div>
        </section>
      )}

      {recipe.sections?.length > 0 && (
        <section>
          <h2 className="text-xs font-semibold tracking-widest uppercase text-brown-muted mb-5">
            {recipe.isNote ? 'Notes' : 'How to'}
          </h2>
          <div className="space-y-6">
            {recipe.sections.map((section, i) => (
              <div key={i}>
                {section.heading && (
                  <h3 className="font-serif font-medium text-brown mb-1.5">
                    {section.heading}
                  </h3>
                )}
                <p className="text-sm leading-relaxed text-brown-soft">
                  {formatBody(section.body)}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}
    </article>
  )
}
