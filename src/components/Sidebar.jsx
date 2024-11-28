import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import Slider from '@mui/material/Slider';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import useEstimateInfo from '../hooks/useEstimateInfo';
import { TextField } from '@mui/material';

function ResponsiveDrawer(props) {
  const { window } = props;

  const {
    toggle, 
    handleToggle, 
    slider, handleSlider, 
    length_slider, handleLengthSlider, 
    key, handleKeyChange, 
    scale, handleScaleChange, 
    drawerWidth,
    bpm, handleBpm
  } = useEstimateInfo();

  const drawer = (
    <div style={{margin: "20px auto"}}>
        <Box margin="16px">
            <Typography>絵のつくりかた</Typography>
            <ToggleButtonGroup
                value={toggle}
                exclusive
                onChange={handleToggle}
                aria-label="Image"
                >
                <ToggleButton value="draw" aria-label="draw">
                    <Typography>かく</Typography>
                </ToggleButton>
                <ToggleButton value="upload" aria-label="upload">
                    <Typography>画像をアップロード</Typography>
                </ToggleButton>
            </ToggleButtonGroup>
        </Box>

        <Box margin="16px">
            <Typography>響きのきれいさ</Typography>
            <Slider 
                    value={slider}
                    defaultValue={0}
                    min={0}
                    step={0.01}
                    max={1} 
                    aria-label="FUSIGIslider"
                    onChange={(e) => handleSlider(e.target.value)}
                    sx={{width: drawerWidth*0.8, margin: "o auto"}}
                />
        </Box>

        <Box margin="16px">
            <Typography>音符の長さ</Typography>
            <Slider 
                    value={length_slider}
                    defaultValue={1.0}
                    min={0.25}
                    step={0.01}
                    max={4} 
                    aria-label="Lengthslider"
                    onChange={(e) => handleLengthSlider(e.target.value)}
                    sx={{width: drawerWidth*0.8, margin: "o auto"}}
                />
        </Box>

        <Box margin="16px">
            <Typography>はやさ</Typography>
            <Slider 
                    value={bpm}
                    defaultValue={120}
                    min={60}
                    step={1}
                    max={300} 
                    aria-label="BpmSlider"
                    onChange={(e) => handleBpm(e.target.value)}
                    sx={{width: drawerWidth*0.8, margin: "o auto"}}
                />
        </Box>

        <Box margin="16px">
            <Typography>使用する和音/スケール</Typography>
            {
            Array(4).fill(0).map((val, i) => {
              return(
                <div key={"choose" + i}>
                  <Typography>{i+1}</Typography>
                  <Select
                      labelId="select-scale"
                      id="scale-select"
                      defaultValue={key[i]}
                      label="key"
                      onChange={(e) => handleKeyChange(e.target.value, i)}
                  >
                      <MenuItem value={0}>C</MenuItem>
                      <MenuItem value={1}>Db</MenuItem>
                      <MenuItem value={2}>D</MenuItem>
                      <MenuItem value={3}>Eb</MenuItem>
                      <MenuItem value={4}>E</MenuItem>
                      <MenuItem value={5}>F</MenuItem>
                      <MenuItem value={6}>Gb</MenuItem>
                      <MenuItem value={7}>G</MenuItem>
                      <MenuItem value={8}>Ab</MenuItem>
                      <MenuItem value={9}>A</MenuItem>
                      <MenuItem value={10}>Bb</MenuItem>
                      <MenuItem value={11}>B</MenuItem>
                  </Select>
                  <Select
                      labelId="select-scale"
                      id="scale-select"
                      defaultValue={scale[i]}
                      label="scale"
                      onChange={(e) => handleScaleChange(e.target.value, i)}
                  >
                      <MenuItem value="major">メジャー</MenuItem>
                      <MenuItem value="minor">マイナー</MenuItem>
                      <MenuItem value="penta">ペンタ</MenuItem>
                      <MenuItem value="seventh">セブンス</MenuItem>
                  </Select>
                </div>
              )
            })
            }
        </Box>
    </div>
  );

  return (
    <Box>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}   

export default ResponsiveDrawer;
