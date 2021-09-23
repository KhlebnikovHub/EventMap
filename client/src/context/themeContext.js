import { createContext, useContext, useState } from "react";

const animationBackGroundContext = createContext();

export const AnimationBackGroundProvider = ({ children }) => {

  const [switchAnimation, setSwitchAnimation] = useState(true);

  return (
    <animationBackGroundContext.Provider value={{switchAnimation, setSwitchAnimation}}>
      {children}
    </animationBackGroundContext.Provider>
  )
}

export const useAnimationContext = () => useContext(animationBackGroundContext)
