import React from 'react'
import { Container } from 'react-bootstrap';

const Immunization = () => {
  return (
    <Container>
      <div style={{ marginTop: '60px' }}>
        <h2>Immunization</h2>
        <p>
          Nullam quis risus eget <a href="#">urna mollis ornare</a> vel eu leo. Cum sociis natoque penatibus et magnis dis
          parturient montes, nascetur ridiculus mus. Nullam id dolor id nibh ultricies vehicula.
        </p>
        <p>
          <small>This line of text is meant to be treated as fine print.</small>
        </p>
        <p>The following is <strong>rendered as bold text</strong>.</p>
        <p>The following is <em>rendered as italicized text</em>.</p>
        <p>An abbreviation of the word attribute is <abbr title="attribute">attr</abbr>.</p>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', paddingTop: '40px', paddingBottom: '60px' }}>
        <div className="list-group">
          <a href="#" className="list-group-item list-group-item-action flex-column align-items-start active">
            <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-1">List group item heading</h5>
              <small>3 days ago</small>
            </div>
            <p className="mb-1">
              Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.
            </p>
            <small>Donec id elit non mi porta.</small>
          </a>
          <a href="#" className="list-group-item list-group-item-action flex-column align-items-start">
            <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-1">List group item heading</h5>
              <button type="button" className="btn btn-outline-dark">
                Click Here to Sign-up
              </button>
            </div>
            <p className="mb-1">
              Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.
            </p>
            <small className="text-muted">Donec id elit non mi porta.</small>
          </a>
        </div>
      </div>

    </Container>
  )
}

export default Immunization
