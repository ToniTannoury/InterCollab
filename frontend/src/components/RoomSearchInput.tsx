
'use client'
import React, { useState, useEffect } from 'react';



function RoomSearchInput() {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchCriteria, setSearchCriteria] = useState<string>('userName'); // Default search criteria
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const [searchResults, setSearchResults] = useState<Room[][]|[]>([]);

  const fetchSearchResults = async () => {


  return (
    
  );
}


export default RoomSearchInput;
