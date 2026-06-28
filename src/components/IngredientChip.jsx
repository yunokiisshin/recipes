import { INGREDIENT_ICONS } from '../data/recipes'

export default function IngredientChip({ ingredientKey, amount }) {
  const item = INGREDIENT_ICONS[ingredientKey]
  if (!item) return null

  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cream-200 border border-cream-300 text-xs text-brown-soft">
      <span className="text-base leading-none">{item.icon}</span>
      {item.label}
      {amount && (
        <>
          <span className="text-cream-300">·</span>
          <span className="text-brown-muted">{amount}</span>
        </>
      )}
    </span>
  )
}
