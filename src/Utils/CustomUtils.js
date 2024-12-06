import axios from "axios";
import React, {createContext, useContext, useReducer, useState, useEffect} from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import Modal from "react-modal"
import {v4 as uuid} from "uuid"
import { Tab, Tabs, TabList,TabPanel } from "react-tabs";
import { Navigate, useLocation } from "react-router-dom";

export {
    axios,
    React,
    createContext,
    useContext,
    useReducer,
    useEffect,
    useState,
    toast,
    Link,
    TabList,
    useLocation,
    useNavigate,
    useParams,
    Modal,
    uuid,
    Tab,
    TabPanel,
    Tabs,
    Navigate
}
