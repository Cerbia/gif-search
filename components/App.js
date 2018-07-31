//nazwę klasy | propsy czyli właściwości danego elementu (wejścia) |dzieci elementu, czyli to co ma się znaleźć wewnątrz. Może to być zarówno tekst jak i kolejny ReactElement
var contacts = [
  {
    id: 1,
    firstName: 'Jan',
    lastName: 'Nowak',
    email: 'jan.nowak@example.com',
    photo: 'https://i2.wp.com/entertainmentmesh.com/wp-content/uploads/2017/12/Nyan-Cat-meme-2.jpg?w=600'
  },
  {
    id: 2,
    firstName: 'Adam',
    lastName: 'Kowalski',
    email: 'adam.kowalski@example.com',
    photo: 'http://www.humorandmemes.com/wp-content/uploads/2016/07/13516159_1064012330360472_3071202375964824008_n.jpg'
  },
  {
    id: 3,
    firstName: 'Zbigniew',
    lastName: 'Koziol',
    email: 'zbigniew.koziol@example.com',
    photo: 'https://skinnyms.com/wp-content/uploads/2015/03/9-Best-Grumpy-Cat-Memes-1.jpg'
  }
];
var contactForm = {
  firstName: '',
  lastName: '',
  email: '',
  photo: ''
};

var App = React.createClass({
	render: function() {
		return (<div className={'app'}>
        <ContactForm contactForm={contactForm}></ContactForm>
        <Contacts items={contacts}></Contacts>
      </div>);
	}
});