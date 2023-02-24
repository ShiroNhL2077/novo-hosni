import React, { useState } from 'react'
import ClipLoader from "react-spinners/ClipLoader";

export default function Loading() {
    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("#ffffff");
  return (
    <div className="sweet-loading d-flex justify-content-center align-items-center">
    <ClipLoader
      color={color}
      loading={loading}
      size={150}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  </div>
  )
}
