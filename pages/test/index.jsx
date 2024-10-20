import {useState} from'react'

import {
  BoardTemplates,
  BoardTemplateColumns,
  BoardTemplateIds,
} from '../../src/enumerations/database';

let TestPage = () => {
  let [boards, setBoards] = useState([])

  return (
    <main>
      <section>
        <h1>Board Templates</h1>

        <ul>
          {Object.values(BoardTemplates).map((boardTemplate) => (
            <li>
              <div>
                <h2>{boardTemplate}</h2>

                <h3>Board Template Columns</h3>

                <ul>
                  {Object.values(BoardTemplateColumns[boardTemplate]).map(
                    (column) => (
                      <li>{column}</li>
                    )
                  )}
                </ul>

                <button
                  onClick={() =>
                    Promise
                      .resolve(BoardTemplateIds[boardTemplate])
                      .then(id => ({ id: crypto.randomUUID() }))
                      .then((board) => setBoards(boards => boards.concat(board)))
                  }
                >
                  Create Board from this Template
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <ul>
          {boards.map(board => <li>{board.id}</li>)}
        </ul>
      </section>
    </main>
  );
};

export default TestPage;
