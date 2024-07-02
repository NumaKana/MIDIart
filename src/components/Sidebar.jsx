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

function ResponsiveDrawer(props) {
  const { window } = props;

  const {toggle, handleToggle, slider, handleSlider, length_slider, handleLengthSlider, scale, handleScaleChange, drawerWidth} = useEstimateInfo();

  const drawer = (
    <div style={{margin: "20px auto"}}>
        <Box margin="16px">
            <Typography>Input Image</Typography>
            <ToggleButtonGroup
                value={toggle}
                exclusive
                onChange={handleToggle}
                aria-label="Image"
                >
                <ToggleButton value="draw" aria-label="draw">
                    <Typography>draw</Typography>
                </ToggleButton>
                <ToggleButton value="upload" aria-label="upload">
                    <Typography>upload</Typography>
                </ToggleButton>
            </ToggleButtonGroup>
        </Box>

        <Box margin="16px">
            <Typography>スケールとの適合度</Typography>
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
                    defaultValue={0}
                    min={0.25}
                    step={0.01}
                    max={4} 
                    aria-label="Lengthslider"
                    onChange={(e) => handleLengthSlider(e.target.value)}
                    sx={{width: drawerWidth*0.8, margin: "o auto"}}
                />
        </Box>

        <Box margin="16px">
            <Typography>使用するコード/スケール</Typography>
            <Select
                labelId="select-scale"
                id="scale-select"
                value={scale}
                label="scale"
                onChange={(e) => handleScaleChange(e.target.value)}
            >
                <MenuItem value="Cmajor">C major</MenuItem>
                <MenuItem value="Cminor">C minor</MenuItem>
                <MenuItem value="Cpenta">C pentatonic</MenuItem>
                <MenuItem value="C7">C7</MenuItem>
            </Select>
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
