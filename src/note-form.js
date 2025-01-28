import { notes } from './data.js';

class NoteForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  //create custom attribute
  static get observedAttributes(){
    return ['note-id','note-title','note-body'];
  }

  attributeChangedCallback(name,oldValue,newValue){
    if (name === 'note-id') {
      console.log(`ID catatan: ${newValue}`);
    }else if (name === 'note-title'){
      console.log(`judul catatan: ${newValue}`);
    }else if (name === 'note-body'){
      console.log(`isi catatan: ${newValue}`);
    }
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        /* Gaya untuk formulir */
        .note-form {
        font-size:46px;
          width:100%;
          height:auto;
          display: flex;
           flex-direction: column;
          gap: 1rem;
           padding: 0;
           margin:0;
          font-family: "Kaushan Script", serif;
          font-weight: 800;
          font-style: normal;
         

        }

        .form-group {
          display: flex;
          flex-direction: column;
          font-family: "Kaushan Script", serif;
          font-weight: 400;
          font-style: normal;

        }

        button{
        font-family: "Kaushan Script", serif;
  font-weight: 400;
  font-style: normal;
  height:3rem;
  font-size:2rem

        }

        label {
        color:white;
          font-weight: bold;
        }
          textarea {
          height:7rem;
}

        input{
        height:5rem;
        
        }



        /* Gaya untuk daftar catatan */
      .list-container {
  margin-top: 1rem;
  display: grid;
  gap: 1rem;
  font-family: "Kaushan Script", serif;
  font-weight: 400;
  font-style: normal;
  overflow-y: auto;

  /* Untuk layar kecil (misalnya, ponsel) */
  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }

  /* Untuk layar sedang (misalnya, tablet) */
  @media (min-width: 769px) and (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  /* Untuk layar besar (misalnya, desktop) */
  @media (min-width: 1025px) {
    grid-template-columns: repeat(3, 1fr);
  }
}
       
        .note {
          border: 1px solid #ccc;
          padding: 1rem;
          margin-bottom: 1rem;
        }
      </style>
      <form class="note-form">
        <div class="form-group">
          <label for="title">Judul:</label>
          <input type="text" id="title" name="title" required  pattern="[a-zA-Z0-9\s]+" 
          title="Judul hanya boleh mengandung huruf, angka, dan spasi."
          >
        </div>
        <div class="form-group">
          <label for="body">Isi:</label>
          <textarea id="body" name="body" required></textarea> 
        </div>
        <button type="submit">Tambah</button> 
      </form>
      <div class="list-container" id="list-container"></div>
    `;

    const listContainer = this.shadowRoot.querySelector('#list-container');

    const createNoteElement = (note) => {
      const noteElement = document.createElement('div');
      noteElement.classList.add('note');

      const titleElement = document.createElement('h3');
      titleElement.textContent = note.title;

      const id = document.createElement('p');
      id.textContent= `ID: ${note.id}`;

      //pembuatan tanggal
      const create = document.createElement('p');
create.textContent = `Dibuat Pada: ${new Date(note.createdAt).toLocaleDateString('id-ID', {
    weekday: 'long', 
    year: 'numeric',
    month: 'long', 
    day: 'numeric' 
})}`;


      const bodyElement = document.createElement('p');
      bodyElement.textContent = note.body;

      noteElement.append(titleElement);
      noteElement.append(id);
      noteElement.append(create);
      noteElement.append(bodyElement);
      
      return noteElement;
    };

    notes.forEach(note => {
      const noteElement = createNoteElement(note);
      listContainer.appendChild(noteElement);
    });

    const form = this.shadowRoot.querySelector('form');
    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const titleInput = this.shadowRoot.querySelector('#title');
      const bodyInput = this.shadowRoot.querySelector('#body');

      const newNote = {
        id: crypto.randomUUID(),
        title: titleInput.value,
        body: bodyInput.value,
        createdAt: new Date(),
        archived: false,
      };

      notes.unshift(newNote);
      alert('data berhasil ditambahkan');

      // Render the updated list
      listContainer.innerHTML = ''; // Clear existing notes
      notes.forEach(note => {
        const noteElement = createNoteElement(note);
        listContainer.appendChild(noteElement);
      });

      titleInput.value = '';
      bodyInput.value = '';
    });
  }
}

customElements.define('note-form', NoteForm);

