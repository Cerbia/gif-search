//nazwę klasy | propsy czyli właściwości danego elementu (wejścia) |dzieci elementu, czyli to co ma się znaleźć wewnątrz. Może to być zarówno tekst jak i kolejny ReactElement
var contacts = [{
  id: 1,
  firstName: 'Jan',
  lastName: 'Nowak',
  email: 'jan.nowak@example.com',
  photo: 'https://i2.wp.com/entertainmentmesh.com/wp-content/uploads/2017/12/Nyan-Cat-meme-2.jpg?w=600'
}, {
  id: 2,
  firstName: 'Adam',
  lastName: 'Kowalski',
  email: 'adam.kowalski@example.com',
  photo: 'http://www.humorandmemes.com/wp-content/uploads/2016/07/13516159_1064012330360472_3071202375964824008_n.jpg'
}, {
  id: 3,
  firstName: 'Zbigniew',
  lastName: 'Koziol',
  email: 'zbigniew.koziol@example.com',
  photo: 'https://skinnyms.com/wp-content/uploads/2015/03/9-Best-Grumpy-Cat-Memes-1.jpg'
}];
var contactForm = {
  firstName: '',
  lastName: '',
  email: '',
  photo: ''
};

var App = React.createClass({
  displayName: 'App',

  render: function () {
    return React.createElement(
      'div',
      { className: 'app' },
      React.createElement(ContactForm, { contactForm: contactForm }),
      React.createElement(Contacts, { items: contacts })
    );
  }
});
var Contact = React.createClass({
	displayName: 'Contact',

	propTypes: {
		url: React.PropTypes.string.isRequired,
		name: React.PropTypes.string.isRequired,
		surname: React.PropTypes.string.isRequired,
		email: React.PropTypes.string.isRequired
	},
	render: function () {
		return React.createElement(
			'div',
			{ className: 'contactItem' },
			React.createElement('img', { className: 'contactImage', src: this.props.url }),
			React.createElement(
				'div',
				{ className: 'contactData' },
				React.createElement(
					'p',
					{ className: 'contactName' },
					'Name: ',
					this.props.name
				),
				React.createElement(
					'p',
					{ className: 'contactSurname' },
					'Surname: ',
					this.props.surname
				),
				React.createElement(
					'a',
					{ className: 'contactEmail', href: 'mailto:' + this.props.email },
					this.props.email
				)
			)
		);
	}
});
var ContactForm = React.createClass({
	displayName: 'ContactForm',

	propTypes: {
		contactForm: React.PropTypes.object.isRequired
	},
	render: function (argument) {
		return React.createElement(
			'form',
			{ className: 'contactForm' },
			React.createElement('input', { type: 'text', placeholder: 'first name', value: this.props.contactForm.firstName }),
			React.createElement('input', { type: 'text', placeholder: 'last name', value: this.props.contactForm.firstName }),
			React.createElement('input', { type: 'text', placeholder: 'email', value: this.props.contactForm.email }),
			React.createElement(
				'button',
				{ type: 'submit' },
				'Add Contact'
			)
		);
	}

});
var Contacts = React.createClass({
    displayName: 'Contacts',

    propTypes: {
        items: React.PropTypes.array.isRequired
    },
    render: function () {
        var contacts = this.props.items.map(function (item) {
            return React.createElement('li', { key: item.id }, React.createElement(Contact, { url: item.photo, name: item.firstName, surname: item.lastName, email: item.email }));
        });
        return React.createElement(
            'ul',
            null,
            contacts
        );
    }
});
var app = React.createElement(App, null); //React.createElement(App);
ReactDOM.render(app, document.getElementById('app'));
