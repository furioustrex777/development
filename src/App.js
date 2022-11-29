import logo from './logo.svg';
import './App.css';
import { useState, useEffect, checked, Checkbox } from "react";
import * as React from 'react';
import bakeryData from "./assets/bakery-data.json";
import BakeryItem from "./components/BakeryItem.js";

bakeryData.forEach((item) => {
  item.image = process.env.PUBLIC_URL + "/" + item.image;
});
bakeryData = bakeryData.sort((a, b) => a.name > b.name ? 1 : -1)

function App() {
    const [options, setOptions] = useState(bakeryData)
    const [filters, setFilters] = useState([])
    const [sorted, setSorted] = useState("")
    const [filtersDiet, setFiltersDiet] = useState([])
    const [favs, setFaves] = useState([])
    const [favorite, setFavorite] = useState(false)

    let initialState = []
    let initialStateDiet = []

    function mySort(event, name, val){
      let copy
      if (val === true) {
        setFavorite(false)
        copy = bakeryData
      }
      else if (favorite) {
        copy = favs
      } else {
        copy = bakeryData
      }
      let touse = copy;
      if (name == "Popularity"){
        touse = copy.sort((a, b) => a.name > b.name ? 1 : -1)
        filters.forEach(x => touse = touse.filter(a => a.type.includes(x)))
        filtersDiet.forEach(x => touse = touse.filter(a => a.dietary.includes(x)))
      }
      if (name == "Price"){  
        touse = copy.sort((a, b) => a.price > b.price ? 1 : -1)
        filters.forEach(x => touse = touse.filter(a => a.type.includes(x)))
        filtersDiet.forEach(x => touse = touse.filter(a => a.dietary.includes(x)))
      }
      if (name == "Calories"){
        touse = copy.sort((a, b) => a.cals > b.cals ? 1 : -1)
        filters.forEach(x => touse = touse.filter(a => a.type.includes(x)))
        filtersDiet.forEach(x => touse = touse.filter(a => a.dietary.includes(x)))
      }
      setSorted(name)
      setOptions(touse);
    }

    function addFilter(name) {
      if (!filters.includes(name)) {
        setFilters(filters => [...filters, name])
      }
    }

    function removeFilter(name) {
      setFilters(filters => filters.filter(obj => {
          return obj !== name
        }))
    }

    useEffect(() => { 
      if(filters !== initialState){
        let copy
        if (favorite) {
          copy = favs
        } else {
          copy = bakeryData
        }
        filters.forEach(x => copy = copy.filter(a => a.type.includes(x)))
        filtersDiet.forEach(x => copy = copy.filter(a => a.dietary.includes(x)))
        setOptions(copy);
        initialState = filters
      }
    }, [filters])

    function addFilterDiet(name) {
      if (!filtersDiet.includes(name)) {
        setFiltersDiet(filtersDiet => [...filtersDiet, name])
      }
    }

    function removeFilterDiet(name) {
      setFiltersDiet(filtersDiet => filtersDiet.filter(obj => {
          return obj !== name
        }))
    }

    useEffect(() => { 
      if(filtersDiet !== initialStateDiet){
        let copy
        if (favorite) {
          copy = favs
        } else {
          copy = bakeryData
        }
        filters.forEach(x => copy = copy.filter(a => a.type.includes(x)))
        filtersDiet.forEach(x => copy = copy.filter(a => a.dietary.includes(x)))

        setOptions(copy);
        initialStateDiet = filtersDiet
      }
    }, [filtersDiet])
    function myfilter(event, name){      
      if (filters.includes(name)){
        removeFilter(name)
      } else {
        addFilter(name)
      }
    }

    function myfilterDiet(event, name){
      if (filtersDiet.includes(name)){
        removeFilterDiet(name)
      } else {
        addFilterDiet(name)

      }
    }

    function myFunctionAdd(event, item){
      if (!favs.includes(item)){
        setFaves(favs => [...favs, item]);
      }
    }

    function myFunctionDel(event, item){
      if (options === favs && favs.length === 1) {
        setFaves([])
        setOptions([])
      }
      else {
        let touse = favs.filter(obj => {
          return obj.name !== item.name
        })
        setFaves(touse)

        if (favorite) {
          filters.forEach(x => touse = touse.filter(a => a.type.includes(x)))
          filtersDiet.forEach(x => touse = touse.filter(a => a.dietary.includes(x)))
          setOptions(touse)
        } 
      }
    }

    function myFavorites(){
      setFavorite(true)
      let touse = favs
      filters.forEach(x => touse = touse.filter(a => a.type.includes(x)))
      filtersDiet.forEach(x => touse = touse.filter(a => a.dietary.includes(x)))
      setOptions(touse);

    }

    function myReset(){
      let event
      setFilters([])
      setFiltersDiet([])
      setFavorite(false)
      // setFaves([])
      setSorted("")
      mySort(event, "Popularity")
    }


    function Button({ name, onClick }) {
      if (sorted === '' && name === "Popularity") {
        return (
        <button class="removesort" onClick={event => mySort(event, name)}>
          <p>{name}</p>
        </button>
        ) 
      }
      if (sorted === name) {
        return (
        <button class="removesort" onClick={event => mySort(event, name)}>
          <p>{name}</p>
        </button>
      )
      }
      return (
        <button onClick={event => mySort(event, name)}>
          <p>{name}</p>
        </button>
      );
    }

    function ButtonType({ name, onClick }) {
      
      if (filters.includes(name)) {
        return (
        <button class="remove" onClick={event => myfilter(event, name)}>
          <p>{name}</p>
        </button>
        )
      }
      return (
        <button onClick={event => myfilter(event, name)}>
          <p>{name}</p>
        </button>
      );
    }

    function ButtonDiet({ name, onClick }) {
      if (filtersDiet.includes(name)) {
        return (
        <button class="remove" onClick={event => myfilterDiet(event, name)}>
          <p>{name}</p>
        </button>
      );
      }
      return (
        <button onClick={event => myfilterDiet(event, name)}>
          <p>{name}</p>
        </button>
      );
    }
    function ButtonFavs({ name, onClick }) {
      let total = 0
      favs.forEach(x => total = total + x.price)
      total = total.toFixed(2)

      if (favorite) {
        return (
        <button class="remove" onClick={event => mySort(event, sorted, true)}>
          <p>{name} 
          <br></br>
          <h6>Favorites Price: ${total}</h6>
          </p>
        </button>
      )
      }
      return (
        <button onClick={myFavorites}>
          <p>{name}
          <br></br>
          <h6>Favorites Price: ${total}</h6>
          </p>
        </button>
      );
    }

    function ButtonFav({ item, onClick }) {
      if (favs.includes(item)) {
        return (
          <button class="removefav" onClick={event => myFunctionDel(event, item)}>
            <p>Remove From Favorites</p>
          </button>
        );
      } else {
        return (
          <button onClick={event => myFunctionAdd(event, item)}>
            <p>Add to Favorites</p>
          </button>
        );
      }
    }

    function ButtonDel({ item, onClick }) {
      return (
        <button onClick={event => myReset(event, item)}>
          <p>Reset Options</p>
        </button>
      );
    }

    function isFav({item}) {
      if (favs.includes(item)) {
        return (
          <button class="remove" onClick={event => myFunctionDel(event, item)}>
            <p>Remove From Favorites</p>
          </button>
        );
      } else {
        return (
          <button onClick={event => myFunctionAdd(event, item)}>
            <p>Add to Favorites</p>
          </button>
        );
      }
    }

  return (
    <div className="App">
      <div className="Header">
        <h1>The Walking Bakery</h1>{" "}
      </div>
      <div className="Body">

      <div className="Cart">
        <div className="CartHeader">
            <h2>Filter Options</h2>
          </div>
        <h4>Sort By</h4>
          <Button name="Popularity" onClick={mySort}/>
          <Button name="Price" onClick={mySort}/>
          <Button name="Calories" onClick={mySort}/>
           {/* <input type="checkbox" checked={sorted === "Popularity" || sorted === ""} id="Popularity" onClick={event => mySort(event, "Popularity")} /><label for="Popularity">Popularity</label>
          <br></br>
           <input type="checkbox" checked={sorted === "Price"} id="Price" onClick={event => mySort(event, "Price")} /><label for="Price">Price</label>
          <br></br>
           <input type="checkbox" checked={sorted === "Calories"} id="Calories" onClick={event => mySort(event, "Calories")} /><label for="Calories">Calories</label> */}
        <h4>Type</h4>
          <ButtonType name="Pastry" onClick={myfilter}/>
          <ButtonType name="Bread" onClick={myfilter}/>
          <ButtonType name="Cake" onClick={myfilter}/>
           {/* <input type="checkbox" checked={filters.includes("Pastry")} id="Pastry" onClick={event => myfilter(event, "Pastry")} /><label for="Pastry">Pastry</label>
          <br></br>
          <input type="checkbox" checked={filters.includes("Bread")} id="Bread" onClick={event => myfilter(event, "Bread")} /><label for="Bread">Bread</label>
          <br></br>
          <input type="checkbox" checked={filters.includes("Cake")} id="Cake" onClick={event => myfilter(event, "Cake")} /><label for="Cake">Cake</label> */}
        <h4>Dietary</h4>
          <ButtonDiet name="Gluten-Free" onClick={myfilterDiet}/>
          <ButtonDiet name="Dairy-Free" onClick={myfilterDiet}/>
          <ButtonDiet name="Nut-Free" onClick={myfilterDiet}/>
          {/* <input type="checkbox" checked={filtersDiet.includes("Gluten-Free")} id="gluten" onClick={event => myfilterDiet(event, "Gluten-Free")} /><label for="gluten">Gluten-Free</label>
          <br></br>
          <input type="checkbox" checked={filtersDiet.includes("Dairy-Free")} id="dairy" onClick={event => myfilterDiet(event, "Dairy-Free")} /><label for="dairy">Dairy-Free</label>
          <br></br>
          <input type="checkbox" checked={filtersDiet.includes("Nut-Free")} id="nut" onClick={event => myfilterDiet(event, "Nut-Free")} /><label for="nut">Nut-Free</label> */}
        <h4>Other</h4>
          <ButtonFavs name="Favorites" onClick={myFavorites}/>
          <ButtonDel name="Reset" onClick={myReset}/>
        </div>
        <div className="Menu">
          {options.map((item, index) => (
            <div className="Item">
              <div className="Deets">
                <BakeryItem item={item}></BakeryItem>
              </div>
                <ButtonFav item={item} onClick={isFav}/>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;

