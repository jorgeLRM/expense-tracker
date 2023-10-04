function Filter({filter, setFilter}) {
  return (
    <div className="filtros sombra contenedor">
      <form>
        <div className="campo">
          <label>Filter expenses</label>
          <select
            value={filter}
            onChange={e => setFilter(e.target.value)}
          >
            <option value="">-- Select --</option>
            <option value="saving">Saving</option>
            <option value="meal">Meal</option>
            <option value="home">Home</option>
            <option value="expenses">Various expenses</option>
            <option value="leisure">Leisure</option>
            <option value="health">Health</option>
            <option value="subscriptions">Subscriptions</option>
          </select>
        </div>
      </form>
    </div>
  );
}

export default Filter;
