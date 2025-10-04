import { rgbToHex, rgbToRgba } from '~/utils/colorUtils'

export interface ColorRGB {
  r: number
  g: number
  b: number
}

export interface ColorThiefOptions {
  quality?: number
  colorCount?: number
}

export const useColorThief = () => {
  let ColorThief: any = null
  
  // Initialize ColorThief when first used
  const initColorThief = async () => {
    if (!ColorThief) {
      // @ts-ignore
      const ColorThiefModule = await import('colorthief')
      ColorThief = ColorThiefModule.default || ColorThiefModule
    }
    return new ColorThief()
  }

  const extractColorFromImage = async (src: string, alpha: number = 1, hex: boolean = false ): Promise<string> => {
    return hex ? getDominantColorHex(src) : getDominantColorRgba(src, alpha)
  }


  const createImageWithCors = (src: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.src = src

      img.addEventListener('load', () => {
        resolve(img)
      })
      
      img.addEventListener('error', (error) => {
        reject(new Error(`Failed to load image: ${error}`))
      })
    })
  }

  const getDominantColor = async (
    imageSrc: string, 
    options: ColorThiefOptions = {}
  ): Promise<ColorRGB> => {
    try {
      const img = await createImageWithCors(imageSrc)
      const colorThief = await initColorThief()
      const [r, g, b] = colorThief.getColor(img, options.quality || 10)
      
      return { r, g, b }
    } catch (error) {
      console.error('Error extracting dominant color:', error)
      throw error
    }
  }

  const getColorPalette = async (
    imageSrc: string, 
    options: ColorThiefOptions = {}
  ): Promise<ColorRGB[]> => {
    try {
      const img = await createImageWithCors(imageSrc)
      const colorThief = await initColorThief()
      const palette = colorThief.getPalette(img, options.colorCount || 5, options.quality || 10)
      
      return palette.map(([r, g, b]: [number, number, number]) => ({ r, g, b }))
    } catch (error) {
      console.error('Error extracting color palette:', error)
      throw error
    }
  }

  const getDominantColorHex = async (
    imageSrc: string, 
    options: ColorThiefOptions = {}
  ): Promise<string> => {
    const color = await getDominantColor(imageSrc, options)
    return rgbToHex(color.r, color.g, color.b)
  }

  const getColorPaletteHex = async (
    imageSrc: string, 
    options: ColorThiefOptions = {}
  ): Promise<string[]> => {
    const palette = await getColorPalette(imageSrc, options)
    return palette.map(color => rgbToHex(color.r, color.g, color.b))
  }

  const getDominantColorRgba = async (
    imageSrc: string, 
    alpha: number = 1,
    options: ColorThiefOptions = {}
  ): Promise<string> => {
    const color = await getDominantColor(imageSrc, options)
    return rgbToRgba(color.r, color.g, color.b, alpha)
  }

  const getColorPaletteRgba = async (
    imageSrc: string, 
    alpha: number = 1,
    options: ColorThiefOptions = {}
  ): Promise<string[]> => {
    const palette = await getColorPalette(imageSrc, options)
    return palette.map(color => rgbToRgba(color.r, color.g, color.b, alpha))
  }

  return {
    getDominantColor,
    getColorPalette,
    getDominantColorHex,
    getColorPaletteHex,
    getDominantColorRgba,
    getColorPaletteRgba,
    extractColorFromImage
  }
}
