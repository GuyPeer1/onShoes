
import { httpService } from './http.service.js'
import { utilService } from './util.service.js'
import * as XLSX from "xlsx"
import dataFile from '../assets/data.xlsx'

const STORAGE_KEY = 'data'

export const dataService = {
    loadData,
}


async function loadData() {
    try {
      const response = await fetch(dataFile);
      const blob = await response.blob();
      const reader = new FileReader();
      return new Promise((resolve, reject) => {
        reader.onload = (event) => {
          const binaryStr = event.target.result;
          const workbook = XLSX.read(binaryStr, { type: "binary" });
          const worksheet = workbook.Sheets[workbook.SheetNames[0]];
          const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
          resolve(rows);
        };
        reader.onerror = (error) => {
          reject(error);
        };
        reader.readAsBinaryString(blob);
      });
    } catch (error) {
      console.log("Error while fetching data: ", error);
      throw error;
    }
  }
  





