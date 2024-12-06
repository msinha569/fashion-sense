import { createContext, useContext, useReducer } from "../Utils/CustomUtils";


const filterContext1 = createContext()
export const useFilterContext = () => useContext(filterContext1)

const reducerfn = (state,action) => {
    switch (action.type){
        case "SORT":
            return{...state, sort: action.payload}
        case "SLIDER":
            return{...state, slider: action.payload}
        case "STOCK":
            return{...state, stock: action.payload}
        case "RATING":
            console.log(action.payload);
            
            return{...state, rating: action.payload}
        case "SEARCHBAR":
            return{...state, search: action.payload}
        case "CATEGORY":
            return{...state, category: action.payload}
        case "DIESEL":
            return{...state,
                category: { ...state["categoryName"],
                diesel: !state.category.diesel
                }
            }
        case "PETROL":
            return{...state,
                category: {...state["categoryName"],
                    petrol: !state.category.petrol
                }
            }
        case "EV" :
            return{...state,
                category: {...state["categoryName"],
                    petrol: !state.category.ev
                }
            }
    }
}

const FilterContext = ({children}) => {
    const [state,dispatch] = useReducer(reducerfn,{
        sort: true,
        slider: true,
        stock: false,
        rating: false,
        search: "",
        category: {
            DIESEL: false,
            PETROL: false,
            EV: false
        }
    })

    return(
        <div>
            <filterContext1.Provider value={{state,dispatch}}>
                {children}
            </filterContext1.Provider>
        </div>
    )
}
export default FilterContext