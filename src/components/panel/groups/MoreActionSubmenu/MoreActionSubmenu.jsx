import React from "react"
import ColorSubmenu from "./ColorSubmenu/ColorSubmenu"

const MoreActionSubmenu = ({ mode, setSubmenu, groupId, functions, data }) => {
    if(mode==='color') {
        return <ColorSubmenu
                    setSubmenu={setSubmenu}
                    groupId={groupId}
                    oldColorName={data.oldColorName}
                    />
    }
}

export default MoreActionSubmenu