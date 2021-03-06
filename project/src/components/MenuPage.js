import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';
import editIcon from '../img/edit-icon.svg';
import favoriteIcon from '../img/star.svg';
import favoriteIcon2 from '../img/star2.svg';

export default class MenuPage extends React.Component {
    constructor() {
        super();
        this.state = {
            currentUser: undefined,
            favorites: {},
            menuItems: {},
            accountPrivilege: '',
            currUser: undefined
        };
    }

    componentDidMount() {
        this.menu = firebase.database().ref('menu/')
        this.menu.on('value', snapshot => this.setState({ menuItems: snapshot.val() }));
        this.authUnsub = firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.setState({currUser: user});
                this.userRef = firebase.database().ref('users').child(user.uid);
                this.userRef.on('value', snapshot => {
                    let privilege = snapshot.val();
                    if (privilege !== null) {
                        this.setState({ accountPrivilege: privilege.privilege });
                    }
                });
                this.setState({ currentUser: user});
                this.favorites = firebase.database().ref('users/' + user.uid + '/favorites');
                this.favorites.on('value', snapshot => this.setState({ favorites: snapshot.val() }));  
            }
        });
    }

    componentWillUnmount() {
        if (this.userRef) {
            this.userRef.off('value');
        }
        this.menu.off();
        this.favorites.off();
        this.authUnsub();
    }

    render() {
        return (
            <div className="menu-view bg-light py-2">
                <h1 className="my-2 text-center selection-1 barlow">T h e  &nbsp; <span className="udon-red">S e l e c t i o n</span></h1>
                {this.state.accountPrivilege === 'admin' ? <AddMenuItem /> : undefined}
                {
                    this.state.menuItems ?
                        <div>
                            {
                                this.state.menuItems.udon ? <div>
                                    <h3 className="text-center selection-2 barlow font-weight-light"><span className="font-weight-bold udon-red">NOODLES</span> for every occasion</h3>
                                    <div className="barlow container d-flex flex-wrap justify-content-center text-center">
                                        {
                                            Object.keys(this.state.menuItems.udon).map((key, index) =>
                                                <MenuItem
                                                    key={index}
                                                    itemKey={key}
                                                    category={'udon'}
                                                    privilege={this.state.accountPrivilege}
                                                    itemName={this.state.menuItems.udon[key].itemName}
                                                    japaneseName={this.state.menuItems.udon[key].japaneseName}
                                                    description={this.state.menuItems.udon[key].description}
                                                    itemPrice={this.state.menuItems.udon[key].itemPrice}
                                                    imageSource={this.state.menuItems.udon[key].imageSource}
                                                    imageName={this.state.menuItems.udon[key].imageName}
                                                    favorite={this.state.favorites ? this.state.favorites[key] : undefined}
                                                    uid={this.state.currentUser ? this.state.currentUser.uid : undefined}
                                                />
                                            )
                                        } </div>
                                </div> : undefined
                            }
                            <br />
                            <br />
                            {
                                this.state.menuItems.side ? <div>
                                    <h3 className="text-center selection-2 barlow font-weight-light">
                                        <img className="plus-icon" src="https://firebasestorage.googleapis.com/v0/b/info343-final-project-b0d70.appspot.com/o/plus.png?alt=media&token=532def02-8ba4-4b00-ab3e-b8740d10716c" alt="plus" />
                                        your favorite <span className="font-weight-bold udon-red">TOPPINGS & SIDES</span>
                                    </h3>
                                    <div className="barlow container d-flex flex-wrap justify-content-center text-center">
                                        {
                                            Object.keys(this.state.menuItems.side).map((key, index) =>
                                                <MenuItem
                                                    key={index}
                                                    itemKey={key}
                                                    category={'side'}
                                                    privilege={this.state.accountPrivilege}
                                                    itemName={this.state.menuItems.side[key].itemName}
                                                    japaneseName={this.state.menuItems.side[key].japaneseName}
                                                    description={this.state.menuItems.side[key].description}
                                                    itemPrice={this.state.menuItems.side[key].itemPrice}
                                                    imageSource={this.state.menuItems.side[key].imageSource}
                                                    imageName={this.state.menuItems.side[key].imageName}
                                                    favorite={this.state.favorites ? this.state.favorites[key] : undefined}
                                                    uid={this.state.currentUser ? this.state.currentUser.uid : undefined}
                                                />
                                            )
                                        }
                                    </div>
                                </div> : undefined
                            }
                            <br />
                            <br />
                            {
                                this.state.menuItems.dessertOrDrink ? <div>
                                    <h3 className="text-center selection-2 barlow font-weight-light">
                                        <img className="plus-icon" src="https://firebasestorage.googleapis.com/v0/b/info343-final-project-b0d70.appspot.com/o/plus.png?alt=media&token=532def02-8ba4-4b00-ab3e-b8740d10716c" alt="plus" />
                                        some <span className="font-weight-bold udon-red">DESSERTS & DRINKS</span>
                                    </h3>
                                    <div className="barlow container d-flex flex-wrap justify-content-center text-center">
                                        {
                                            Object.keys(this.state.menuItems.dessertOrDrink).map((key, index) =>
                                                <MenuItem
                                                    key={index}
                                                    itemKey={key}
                                                    category={'dessertOrDrink'}
                                                    privilege={this.state.accountPrivilege}
                                                    itemName={this.state.menuItems.dessertOrDrink[key].itemName}
                                                    japaneseName={this.state.menuItems.dessertOrDrink[key].japaneseName}
                                                    description={this.state.menuItems.dessertOrDrink[key].description}
                                                    itemPrice={this.state.menuItems.dessertOrDrink[key].itemPrice}
                                                    imageSource={this.state.menuItems.dessertOrDrink[key].imageSource}
                                                    imageName={this.state.menuItems.dessertOrDrink[key].imageName}
                                                    favorite={this.state.favorites ? this.state.favorites[key] : undefined}
                                                    uid={this.state.currentUser ? this.state.currentUser.uid : undefined}
                                                />
                                            )
                                        }
                                    </div>
                                </div> : undefined
                            }
                        </div>
                        : undefined
                }
                <div className="center mx-auto">
                    <img src="https://firebasestorage.googleapis.com/v0/b/info343-final-project-b0d70.appspot.com/o/equals.png?alt=media&token=936dd3ed-c2bd-479d-8769-5cdf8f07d737" alt="equals" />
                </div>
            </div >
        );
    }
}

class MenuItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            favorite: this.props.favorite,
            editing: false,
            editedItemName: this.props.itemName,
            editedJapaneseName: this.props.japaneseName,
            editedDescription: this.props.description
        };
        this.handleEditItem = this.handleEditItem.bind(this);
        this.handleInputNewItemName = this.handleInputNewItemName.bind(this);
        this.handleInputNewJapaneseName = this.handleInputNewJapaneseName.bind(this);
        this.handleInputNewDescription = this.handleInputNewDescription.bind(this);
        this.stopEditing = this.stopEditing.bind(this);
        this.handleCancelEdit = this.handleCancelEdit.bind(this);
        this.handleUpdateFavorite = this.handleUpdateFavorite.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({favorite: nextProps.favorite});
    }

    handleEditItem() {
        this.setState({ editing: true });
        this.menuItems.style = 'background-color: cornsilk';
    }

    deleteItem(key) {
        firebase.database().ref('menu/' + this.props.category + '/' + key).remove();
        let storageRef = firebase.storage().ref('menu/');
        storageRef.child(key + '/' + this.props.imageName).delete();
    }

    handleInputNewItemName(event) {
        this.setState({ editedItemName: event.target.value });
    }

    handleInputNewJapaneseName(event) {
        this.setState({ editedJapaneseName: event.target.value });
    }

    handleInputNewDescription(event) {
        this.setState({ editedDescription: event.target.value });
    }

    stopEditing() {
        this.menuItem.style = undefined;
        this.setState({ editing: false });
    }

    handleCancelEdit() {
        this.stopEditing();
        this.setState({ editedItemName: this.props.itemName, editedJapaneseName: this.props.japaneseName, editedDescription: this.props.description });
    }

    handleSaveEdit() {
        this.updateMenuItem();
        this.stopEditing();
    }

    handleUpdateFavorite() {
        let updates = {};
        updates['users/' + this.props.uid + '/favorites/' + this.props.itemKey] = !this.state.favorite;
        firebase.database().ref().update(updates);
        this.setState({ favorite: !this.state.favorite });
    }

    updateMenuItem() {
        let updates = {};
        updates['menu/' + this.props.category + '/' + this.props.itemKey + '/itemName'] = this.state.editedItemName;
        updates['menu/' + this.props.category + '/' + this.props.itemKey + '/japaneseName'] = this.state.editedJapaneseName;
        updates['menu/' + this.props.category + '/' + this.props.itemKey + '/description'] = this.state.editedDescription;
        firebase.database().ref().update(updates);
    }

    favorite(itemName) {
        firebase.database().ref('users/' + this.state.currUser + '/favorites/' + itemName).update({
            itemName: !firebase.database().ref('users/' + this.state.currUser + '/favorites/' + itemName).val()
        });
    }

    render() {
        return (
            <div className="menu-item my-2 col-lg-3 col-md-4" ref={menuItem => this.menuItem = menuItem}>
                {
                    this.props.privilege === 'admin' ? <div>
                        <img className="edit-icon" src={editIcon} alt="options" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" />
                        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenu">
                            <div className="dropdown-header">Options</div>
                            <div>
                                <div className="dropdown-item" onClick={() => this.handleEditItem()}>
                                    Edit item
                                </div>
                                <div className="dropdown-item" onClick={() => this.deleteItem(this.props.itemKey)}>
                                    Delete item
                                </div>
                            </div>
                        </div>
                    </div> : undefined
                }
                {
                    this.props.privilege === 'user' ? <div>
                        {
                            this.state.favorite ? 
                            <img className="favorite-icon" src={favoriteIcon2} alt="favorite" 
                                onClick={() => this.handleUpdateFavorite()}
                            /> : 
                            <img className="favorite-icon" src={favoriteIcon} alt="favorite" 
                                onClick={() => this.handleUpdateFavorite()}                            
                            />
                        }
                    </div> : undefined
                }
                <img className="menu-pic" src={this.props.imageSource} alt={this.props.imageName} />
                {
                    this.state.editing ? <form className="menu-japanese">
                        <input className="menu-input form-control font-weight-bold" required
                            value={this.state.editedItemName}
                            onInput={event => this.handleInputNewItemName(event)}
                        />
                        <input className="menu-input form-control" required
                            value={this.state.editedJapaneseName}
                            onInput={event => this.handleInputNewJapaneseName(event)}
                        />
                        <textarea className="menu-input form-control menu-desc" rows="5" required
                            value={this.state.editedDescription}
                            onInput={event => this.handleInputNewDescription(event)}
                        />
                        <div className="edit-buttons">
                            <button className="btn menu-button btn-success ml-3" type="button" onClick={() => this.handleSaveEdit()}>Save</button>
                            <button className="btn menu-button btn-secondary mr-3" type="button" onClick={() => this.handleCancelEdit()}>Cancel</button>
                        </div>
                    </form> : <div className="menu-japanese">
                            <p className="my-1 font-weight-bold">
                                {this.props.itemName}
                                <svg className="svg-icon" onClick={() => this.favorite(this.props.itemName)} height="20" viewBox="0 0 20 20">
                                    <path d="M9.719,17.073l-6.562-6.51c-0.27-0.268-0.504-0.567-0.696-0.888C1.385,7.89,1.67,5.613,3.155,4.14c0.864-0.856,2.012-1.329,3.233-1.329c1.924,0,3.115,1.12,3.612,1.752c0.499-0.634,1.689-1.752,3.612-1.752c1.221,0,2.369,0.472,3.233,1.329c1.484,1.473,1.771,3.75,0.693,5.537c-0.19,0.32-0.425,0.618-0.695,0.887l-6.562,6.51C10.125,17.229,9.875,17.229,9.719,17.073 M6.388,3.61C5.379,3.61,4.431,4,3.717,4.707C2.495,5.92,2.259,7.794,3.145,9.265c0.158,0.265,0.351,0.51,0.574,0.731L10,16.228l6.281-6.232c0.224-0.221,0.416-0.466,0.573-0.729c0.887-1.472,0.651-3.346-0.571-4.56C15.57,4,14.621,3.61,13.612,3.61c-1.43,0-2.639,0.786-3.268,1.863c-0.154,0.264-0.536,0.264-0.69,0C9.029,4.397,7.82,3.61,6.388,3.61"></path>
                                </svg>
                            </p>
                            <p className="my-0">{this.props.japaneseName}</p>
                            <p className="menu-desc my-0">{this.props.description}</p>
                        </div>
                }
            </div >
        );
    }
}

class AddMenuItem extends React.Component {
    constructor() {
        super();
        this.state = {
            category: '',
            itemName: '',
            japaneseName: '',
            description: '',
            itemPrice: 0,
            imageExists: false
        };
        this.handleInputItemName = this.handleInputItemName.bind(this);
        this.handleInputJapaneseName = this.handleInputJapaneseName.bind(this);
        this.handleInputDescription = this.handleInputDescription.bind(this);
        this.handleInputItemPrice = this.handleInputItemPrice.bind(this);
        this.handleShowImage = this.handleShowImage.bind(this);
        this.handleAddMenuItem = this.handleAddMenuItem.bind(this);
    }

    handleInputItemName(event) {
        this.setState({ itemName: event.target.value });
    }

    handleInputJapaneseName(event) {
        this.setState({ japaneseName: event.target.value });
    }

    handleInputDescription(event) {
        this.setState({ description: event.target.value });
    }

    handleInputItemPrice(event) {
        this.setState({ itemPrice: event.target.value });
    }

    handleShowImage(event) {
        let file = event.target.files[0];
        console.log(file);
        if (file) {
            let reader = new FileReader();
            reader.readAsDataURL(file)
            reader.onload = () => this.foodImage.src = reader.result;
            this.setState({ imageExists: true });
        }
    }

    handleAddMenuItem(event) {
        event.preventDefault();
        let file = this.imageInput.files[0];
        if (file) {
            let key = firebase.database().ref().child('menu/' + this.state.category + '/').push().key;
            let storageRef = firebase.storage().ref('menu/' + key).child(file.name);
            storageRef.put(file).then(snapshot => this.handleUpdateMenuItem(event, key, file.name, snapshot.downloadURL));
        }
    }

    handleInputItemCategory() {
        if (this.radio1.checked) {
            this.setState({ category: this.radio1.value });
        } else if (this.radio2.checked) {
            this.setState({ category: this.radio2.value });
        } else {
            this.setState({ category: this.radio3.value });
        }
    }

    handleUpdateMenuItem(event, key, fileName, imageUrl) {
        let menuData = {
            imageSource: imageUrl,
            imageName: fileName,
            itemName: this.state.itemName,
            japaneseName: this.state.japaneseName,
            description: this.state.description,
            itemPrice: ''
        };
        let updates = {};
        updates['menu/' + this.state.category + '/' + key] = menuData;
        firebase.database().ref().update(updates);
        this.imageInput.value = '';
        this.foodImage.src = '';
        this.setState({ itemName: '', japaneseName: '', description: '', imageSource: '', itemPrice: 0, imageExists: false });
    }

    render() {
        return (
            <div className="center">
                <button className="btn btn-dark mt-4" data-toggle="modal" data-target="#addMenuItem">Add Menu Item</button>
                <div className="modal fade" id="addMenuItem" tabIndex="-1" role="dialog" aria-labelledby="addMenuItemLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <form className="modal-content" onSubmit={event => this.handleAddMenuItem(event)}>
                            <div id="modalHeader" className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div id="modalBody" className="modal-body">
                                <h2>Add New Menu Item</h2>
                                <img className="food-item" alt="Food Item" ref={foodImage => this.foodImage = foodImage} />
                                {this.state.imageExists ? undefined : <div className="alert alert-danger">An image is required</div>}
                                <button className="btn btn-dark d-block mt-3 mb-3 mx-auto" onClick={() => this.imageInput.click()}>Add Image</button>
                                <label className="custom-control custom-radio">
                                    <input id="radio1" name="radio" type="radio" className="custom-control-input" value="udon" required
                                        ref={radio1 => this.radio1 = radio1}
                                        onChange={event => this.handleInputItemCategory(event)}
                                    />
                                    <span className="custom-control-indicator"></span>
                                    <span className="custom-control-description">Udon</span>
                                </label>
                                <label className="custom-control custom-radio">
                                    <input id="radio2" name="radio" type="radio" className="custom-control-input" value="side"
                                        ref={radio2 => this.radio2 = radio2}
                                        onChange={event => this.handleInputItemCategory(event)}
                                    />
                                    <span className="custom-control-indicator"></span>
                                    <span className="custom-control-description">Topping/Side</span>
                                </label>
                                <label className="custom-control custom-radio">
                                    <input id="radio3" name="radio" type="radio" className="custom-control-input" value="dessertOrDrink"
                                        ref={radio3 => this.radio3 = radio3}
                                        onChange={event => this.handleInputItemCategory(event)}
                                    />
                                    <span className="custom-control-indicator"></span>
                                    <span className="custom-control-description">Dessert/Drink</span>
                                </label>
                                <div className="form-group">
                                    <input type="text" className="form-control" placeholder="Item Name" required
                                        value={this.state.itemName}
                                        onInput={event => this.handleInputItemName(event)}
                                    />
                                </div>
                                <div className="form-group">
                                    <input type="text" className="form-control" placeholder="Japanese Name" required
                                        value={this.state.japaneseName}
                                        onInput={event => this.handleInputJapaneseName(event)}
                                    />
                                </div>
                                <div className="form-group">
                                    <textarea className="form-control" placeholder="Description" rows="4"
                                        value={this.state.description}
                                        onInput={event => this.handleInputDescription(event)}>
                                    </textarea>
                                </div>
                                <div className="form-group">
                                    <input type="number" className="form-control" placeholder="Item price" required
                                        value={this.state.itemPrice}
                                        onInput={event => this.handleInputItemPrice(event)}
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="submit" className="btn btn-success">Save</button>
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            </div>
                            <input className="hide" type="file" accept="image/*" required
                                ref={imageInput => this.imageInput = imageInput}
                                onChange={(event) => this.handleShowImage(event)}
                            />
                        </form>

                    </div>
                </div>
            </div>
        );
    }
}