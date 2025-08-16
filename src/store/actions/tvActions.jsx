

import axios from "../../utils/axios";
export { removetv } from "../reducers/tvSlice";
import { loadtv } from "../reducers/tvSlice";

export const asyncloadtv = (id) => async (dispatch, getState) => {
  try {
    const detail = await axios.get(`/tv/${id}`);
    const externalid = await axios.get(`/tv/${id}/external_ids`);
    const recommendation = await axios.get(`/tv/${id}/recommendations`);
    const similar = await axios.get(`/tv/${id}/similar`);
    const videos = await axios.get(`/tv/${id}/videos`);
    const watchproviders = await axios.get(`/tv/${id}/watch/providers`);
    
    let theultimatedetails = {
      detail: detail.data,
      externalid: externalid.data,
      recommendation: recommendation.data.results,
      similar: similar.data.results,
      videos: videos.data.results, // Store the full array, not just one trailer
      watchproviders: watchproviders.data.results.US,
    };

    dispatch(loadtv(theultimatedetails));
  } catch (error) {
    console.log("Error: ", error);
  }
};