import React, { useEffect } from "react"
import { useGetPanelDataQuery } from "store/panelAPI"
import GroupsContainer from "components/panel/groups/Groups/GroupsContainer"
import ViewError from "components/common/ViewError/ViewError"
import Preloader from "components/common/Preloader/Preloader"
import { useDispatch, useSelector } from "react-redux"
import { setData } from "store/panelSlice"
import { useAddTestDataMutation, useGetTestDataQuery } from "store/authAPI"

const Panel = () => {

  const userId = useSelector(store => store.auth.auth.userId)
  const { data: panelData, error: panelDataError, isLoading: panelDataIsLoading, refetch: refetchPanelData } = useGetPanelDataQuery({userId})
  const dispatch = useDispatch()
  const storePanelData = useSelector(store => store.panel.data)

  useEffect(() => {
    if(panelData){
      dispatch(setData({data: panelData.data}))}
  }, [panelData])

  if(!panelDataIsLoading) {
    return(
        <>
          {panelData&&!panelDataError?<GroupsContainer data={storePanelData}/>:null}
          {panelDataError?<ViewError message={'Произошла какая-то ошибка. Перезагрузите страницу или попробуйте позже'}/>:null}
        </>
    )
  } else {
    return(
      <Preloader/>
    )
  }
}

export default Panel