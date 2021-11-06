import React from "react";
import { useParams } from "react-router-dom";
import NoMatch from "./NoMatch";

export default function EditPythocron() {
    let { pythocronId } = useParams();
    if (!pythocronId) {
        return <NoMatch />;
    }
    return (pythocronId)
}