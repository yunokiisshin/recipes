import { Plus, ChefHat } from 'lucide-react'
import { CATEGORY_ORDER } from '../data/recipes'

export default function Sidebar({ recipes, selectedId, onSelect, onAdd, isOpen, onClose }) {
  const present = new Set(recipes.map(r => r.category))
  const categories = CATEGORY_ORDER.filter(c => present.has(c))

  return (
    <aside className={`
      fixed md:sticky top-0 inset-y-0 left-0
      w-60 shrink-0 h-screen z-40 flex flex-col
      border-r border-cream-300 bg-cream-100
      transition-transform duration-250 ease-in-out
      ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
    `}>
      <div className="px-5 py-5 border-b border-cream-300 flex items-center gap-2">
        <ChefHat size={18} className="text-amber-warm" />
        <span className="font-serif text-lg font-medium text-brown">Recipes</span>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-3">
        {categories.length === 0 && (
          <p className="px-2 text-xs text-brown-muted">No recipes yet — add one!</p>
        )}
        {categories.map(cat => {
          const catRecipes = recipes.filter(r => r.category === cat)
          return (
            <div key={cat} className="mb-5">
              <p className="px-2 mb-1 text-[10px] font-semibold tracking-widest text-brown-muted uppercase">
                {cat}
              </p>
              {catRecipes.map(recipe => (
                <button
                  key={recipe.id}
                  onClick={() => onSelect(recipe.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    selectedId === recipe.id
                      ? 'bg-cream-300 text-brown font-medium'
                      : 'text-brown-soft hover:bg-cream-200'
                  }`}
                >
                  {recipe.title}
                </button>
              ))}
            </div>
          )
        })}
      </nav>

      <div className="px-3 py-4 border-t border-cream-300">
        <button
          onClick={onAdd}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm text-amber-warm border border-amber-warm/40 hover:bg-amber-warm/10 transition-colors"
        >
          <Plus size={15} />
          Add Recipe
        </button>
      </div>
    </aside>
  )
}
