	// Controleur pour le stockage

const StorageCtrl = (function(){
	
	return {
		
		storeItem : function(item) {
			
			let items;
			
			// Vérifier si des éléments existent dans le local storage
			
			if(localStorage.getItem('items') === null) {
				
				items = [];
				items.push(item);
				
				// Modification du Local Storage pour inscrire le nouvel élément
				
				localStorage.setItem('items',JSON.stringify(items));
				
			}
			
			else {
				
				// Aller chercher les éléments se trouvant déjà dans le Local Storage
				
				items = JSON.parse(localStorage.getItem('items'));
				
				items.push(item);
				
				localStorage.setItem('items',JSON.stringify(items));
				
			}
			
		},
		
		getItemsFromStorage : function(){
			
			let items;
			
			if(localStorage.getItem('items') === null) {
				
				items = [];
				
			}
			
			else {
				
				items = JSON.parse(localStorage.getItem('items'));
				
			}
			
			return items;
			
		},
		
		updateItemStorage : function(updatedItem) {
			
			let items = JSON.parse(localStorage.getItem('items'));
			
			items.forEach(function(item,index) {
				
				if(updatedItem.id === item.id) {
					
					items.splice(index,1,updatedItem);
					
				}
				
			});
			
			localStorage.setItem('items',JSON.stringify(items));
			
		},
		
		deleteItemFromStorage : function(id) {
			
			let items = JSON.parse(localStorage.getItem('items'));
			
			items.forEach(function(item,index) {
				
				if(id === item.id) {
					
					items.splice(index,1);
					
				}
				
			});
			
			localStorage.setItem('items',JSON.stringify(items));
			
		},
		
		clearItemsFromStorage : function() {
			
			localStorage.removeItem('items');	
			
		}
		
	}
	
})();

// Controleur pour les éléments

const ItemCtrl = (function() {
	
	// Création d'un contructeur
	
	const Item = function(id,name,calories) {
		
		this.id = id;
		this.name = name;
		this.calories = calories;
		
	}
	
	// Structure des données
	
	const data = {
		
		items : StorageCtrl.getItemsFromStorage(),
		currentItem : null,
		totalCalories : 0
		
	}
	
	// Public
	
	return {
		
		getItems : function() {
			
			return data.items;
			
		},
		
		addItem : function(name,calories) {
			
			let ID;
			
			// Générer un ID
			
			if(data.items.length > 0 ) {
				
				ID = data.items[data.items.length - 1].id + 1;
				
			}
			
			else {
				
				ID = 0;
				
			}
			
			// Convertir calories en INT 
			
			calories = parseInt(calories);
			
			// Créer un nouvel objet item
			
			newItem = new Item(ID,name,calories);
			
			// Ajout de l'élément dans le tableau 
			
			data.items.push(newItem);
			
			return newItem;
			
		},
		
		getItemById : function(id) {
			
			let found = null;
			
			// Boucle parmi les éléments
			
			data.items.forEach(function(item) {
				
				if(item.id === id) {
					
					found = item;
					
				}
				
			});
			
			return found;
			
		},
		
		updateItem : function(name,calories) {
			
			// Calories en nombre
			
			calories = parseInt(calories);
			
			let found = null;
			
			// Boucle
			
			data.items.forEach(function(item) {
				
				if(item.id === data.currentItem.id) {
					
					item.name = name;
					item.calories = calories;
					found = item;
					
				}
				
			});
			
			return found;
			
		},
		
		setCurrentItem : function(item) {
			
			data.currentItem = item;	
			
		},
		
		getCurrentItem : function() {
			
			return data.currentItem;
			
		},
		
		getTotalCalories : function() {
			
			let total = 0;
			
			// Boucle
			
			data.items.forEach(function(item) {
				
				total += item.calories;
				
			// Ajout du total dans la structure de données
								
			});
			
			data.totalCalories = total;
			
			// Retourner le total
			
			return data.totalCalories;
			
		},
		
		deleteItem : function(id) {
			
			// On va chercher les Ids
			
			const ids = data.items.map(function(item) {
				
				return item.id;
				
			});
			
			// On va chercher l'index du tableau
			
			const index = ids.indexOf(id);
			
			// Supprimer l'élément du tableau
			
			data.items.splice(index,1);
			
		},
		
		clearAllItems : function() {
			
			data.items = [];
			
		},
		
		logData : function() {
			
			return data;
			
		}
		
	}
	
})();

// Controleur pour l'interface utilisateur

const UiCtrl = (function() {
	
	const UiSelectors = {
		
		itemList : '#item-list',
		listItems : '#item-list li',
		addBtn : '.add-btn',
		deleteBtn : '.delete-btn',
		updateBtn : '.update-btn',
		backBtn : '.back-btn',
		deleteAll : '.deleteAllBtn',
		itemNameInput : '#aliment',
		itemCaloriesInput : '#calories',
		totalCalories : '.total-calories'
		
	}
	
	// Méthodes publiques
	
	return {
		
		populateItemList : function(items) {
			
			let html = '';
			
			items.forEach(function(item) {
				
				html += `<li class="list-group-item" id="item-${item.id}">
							<strong>${item.name} :</strong> <em>${item.calories} calories</em>
							<a href="#"> <i class="fas fa-pencil-alt"></i></a>
						</li>`
				
			});
			document.querySelector(UiSelectors.itemList).innerHTML = html;
			
		},
		
		getItemInput : function() {
			
			return {
			
				name: document.querySelector(UiSelectors.itemNameInput).value,
				calories: document.querySelector(UiSelectors.itemCaloriesInput).value
				
			}
			
		},
		
		addListItem : function(item) {
			
			// Montrer la liste
			
			document.querySelector(UiSelectors.itemList).style.display = 'block';
			
			// création d'une nouvelle li
			
			const li = document.createElement('li');
			
			// Ajouter une classe à la li
			
			li.className = 'list-group-item';
			
			// Ajout ID
			
			li.id = `item-${item.id}`;
			
			// Ajout Html
			
			li.innerHTML = `<strong>${item.name} :</strong> <em>${item.calories} calories</em>
			<a href="#"> <i class="fas fa-pencil-alt edit-item"></i></a>`;
			
			// Rattacher les li à la ul (#item-list)
			
			document.querySelector(UiSelectors.itemList).insertAdjacentElement('beforeend',li);
			
		},
		
		updateListItem : function(item) {
			
			let listItems = document.querySelectorAll(UiSelectors.listItems);
			
			// Convertir en tableau toutes les li (id)
			
			listItems = Array.from(listItems);
			
			// Boucle
			
			listItems.forEach(function(listItem) {
				
				const itemID = listItem.getAttribute('id');
				
				if(itemID === `item-${item.id}`) {
					
					document.querySelector(`#${itemID}`).innerHTML = `<strong>${item.name} : </strong> <em>${item.calories} Calories</em>
					<a href="#"> <i class="fas fa-pencil-alt"></i></a>`;
					
				}
				
			});
			
		},
		
		deleteListItem : function(id) {
			
			const itemID = `#item-${id}`;
			
			const item = document.querySelector(itemID);
			
			item.remove();
			
		},
		
		clearInput : function() {
			
			document.querySelector(UiSelectors.itemNameInput).value = '';	
			
			document.querySelector(UiSelectors.itemCaloriesInput).value = '';
			
		},
		
		removeItems : function() {
			
			let listItems = document.querySelectorAll(UiSelectors.listItems);
			
			listItems = Array.from(listItems);
			
			listItems.forEach(function(item) {
				
				item.remove();
				
			});
			
		},
		
		hideList : function() {
			
			document.querySelector(UiSelectors.itemList).style.display = 'none';	
			
		},
		
		showTotalCalories : function(totalCalories) {
			
			document.querySelector(UiSelectors.totalCalories).textContent = totalCalories;		
			
		},
		
		addItemToForm : function() {
			
			document.querySelector(UiSelectors.itemNameInput).value = ItemCtrl.getCurrentItem().name;
			document.querySelector(UiSelectors.itemCaloriesInput).value = ItemCtrl.getCurrentItem().calories;
			
			UiCtrl.showEditState();
			
		},
		
		clearEditState : function() {
			
			document.querySelector(UiSelectors.updateBtn).style.display = 'none';
			document.querySelector(UiSelectors.deleteBtn).style.display = 'none';
			document.querySelector(UiSelectors.backBtn).style.display = 'none';
			document.querySelector(UiSelectors.addBtn).style.display = 'inline';
			
		},
		
		showEditState : function() {
			
			document.querySelector(UiSelectors.updateBtn).style.display = 'inline';
			document.querySelector(UiSelectors.deleteBtn).style.display = 'inline';
			document.querySelector(UiSelectors.backBtn).style.display = 'inline';
			document.querySelector(UiSelectors.addBtn).style.display = 'none';
			
		},
		
		getSelectors : function() {
			
			return UiSelectors;
			
		}
		
	}
	
})();

// Controleur pour l'application

const App = (function(ItemCtrl,StorageCtrl,UiCtrl) {
	
const loadEventListeners = function() {
	
	// Séléctionner les sélecteur approprié
	
	const UiSelectors = UiCtrl.getSelectors();
	
	// Ajout de l'évènement
	
	document.querySelector(UiSelectors.addBtn).addEventListener('click',itemAddSubmit);
	
	// Editer en cliquant sur les li qui contiennent l'icône crayon
	
	document.querySelector(UiSelectors.itemList).addEventListener('click',itemUpdateSubmit);
	
	// MàJ des éléments
	
	document.querySelector(UiSelectors.updateBtn).addEventListener('click',itemUpdateList);
	
	// Bouton annuler
	
	document.querySelector(UiSelectors.backBtn).addEventListener('click',UiCtrl.clearEditState);
	
	// Bouton supprimer
	
	document.querySelector(UiSelectors.deleteBtn).addEventListener('click',itemDeleteSubmit);
	
	// Bouton tout supprimer
	
	document.querySelector(UiSelectors.deleteAll).addEventListener('click',clearAllItemsClick);
	
}

const itemAddSubmit = function(e) {
	
	const input = UiCtrl.getItemInput();

	// Vérification des champs
	
	if(input.name !== '' && input.calories !== '') {
		
		const newItem = ItemCtrl.addItem(input.name,input.calories);
		
	// Ajouter l'élément à l'interface Utilisateur
	
	UiCtrl.addListItem(newItem);
		
	// Obtenir le total de calories
		
	const totalCalories = ItemCtrl.getTotalCalories();
		
	// Afficher ce total sur l'UI
		
	UiCtrl.showTotalCalories(totalCalories);
		
	// Stockage dans le Local Storage
		
	StorageCtrl.storeItem(newItem);
		
	// Suppression des valeurs contenues dans les champs
		
	UiCtrl.clearInput();
		
	}
	
	e.preventDefault();
	
}

// MàJ des éléments

const itemUpdateSubmit = function(e) {
	
	if(e.target.classList.contains('edit-item')) {
		
		// On va chercher l'ID de l'élément ciblé item-0 item-1
		
		const listId = e.target.parentNode.parentNode.id;
		
		// Mettre l'ID dans un tableau en 2 parties : item / 0
		
		const listIdArr = listId.split('-');
		
		// Obtenir l'ID actuel (convertir en nombre)
		
		const id = parseInt(listIdArr[1]);
		
		const itemToEdit = ItemCtrl.getItemById(id);
		
		// MàJ de l'élément courant
		
		ItemCtrl.setCurrentItem(itemToEdit);
		
		// Ajout de l'élément dans le formulaire
		
		UiCtrl.addItemToForm();
		
	}
	
	e.preventDefault();
	
}

const itemUpdateList = function(e) {
	
	// Identification du champ en question 
	
	const input = UiCtrl.getItemInput();
	
	// Mettre à jour les éléments
	
	const updatedItem = ItemCtrl.updateItem(input.name,input.calories);
	
	// Mettre à jour l'UI
	
	UiCtrl.updateListItem(updatedItem);
	
	// MàJ total calories
	
	const totalCalories = ItemCtrl.getTotalCalories();
	
	// Ajoute les calories à l'UI
	
	UiCtrl.showTotalCalories(totalCalories);
	
	// Mettre à jour le Local Storage
	
	StorageCtrl.updateItemStorage(updatedItem);
	
	UiCtrl.clearEditState();
	
	e.preventDefault();
	
}

	// Gestion du bouton supprimer

	const itemDeleteSubmit = function(e) {
		
		// Chercher l'élément courant
		
		const currentItem = ItemCtrl.getCurrentItem();
		
		// Supprimer l'élément courant des données
		
		ItemCtrl.deleteItem(currentItem);
		
		// Supprimer de l'UI
		
		UiCtrl.deleteListItem(currentItem.id);
		
		// MàJ du total de calories
		
		const totalCalories = ItemCtrl.getTotalCalories();
		
		// Ajouter le total dans l'UI
		
		UiCtrl.showTotalCalories(totalCalories);
		
		StorageCtrl.deleteItemFromStorage(currentItem.id);
		
		UiCtrl.clearEditState();
		
		// Suppression des valeurs à l'intérieur des champs
		
		UiCtrl.clearInput();
		
		e.preventDefault();
		
	}
	
	const clearAllItemsClick = function() {
		
		// Suppression de tous les éléments contenus dans data
		
		ItemCtrl.clearAllItems();
		
		// Modifier le total de calories
		
		const totalCalories = ItemCtrl.getTotalCalories();
		
		UiCtrl.showTotalCalories(totalCalories);
		
		// Suppression des éléments de l'UI
		
		UiCtrl.removeItems();
		
		// Suppression du Local Storage
		
		StorageCtrl.clearItemsFromStorage();
		
		UiCtrl.hideList();
		
	}
	
	// Méthodes publiques
	
	return {
		
		init : function() {
			
			// Gestion des boutons
			
			UiCtrl.clearEditState();
			
			// Parcours et obtient les données 
			
			const items = ItemCtrl.getItems();
			
			// Vérifier si la liste possède des éléments
			
			if(items.length === 0) {
				
				UiCtrl.hideList();
				
			}
			
			else {
				
				// Peupler la liste (ul) avec des éléments (items)
			
				UiCtrl.populateItemList(items);	
				
			}
			
			// Obtenir le total de calories
			
			const totalCalories = ItemCtrl.getTotalCalories();
			
			// Afficher ce total sur l'UI
			
			UiCtrl.showTotalCalories(totalCalories);
			
			// Lancement de la fonction loadEventListeners
			
			loadEventListeners();
			
		}
		
	}
	
})(ItemCtrl,StorageCtrl,UiCtrl);

App.init();









