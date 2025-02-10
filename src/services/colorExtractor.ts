interface RGB {
    r: number;
    g: number;
    b: number;
}

interface ColorCluster {
    color: RGB;
    count: number;
}

export async function extractColorsFromImage(imageUrl: string): Promise<[string, string]> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "Anonymous";

        img.onload = () => {
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');

            if (!context) {
                reject(new Error('Could not get canvas context'));
                return;
            }

            // Set canvas size to match image
            canvas.width = img.width;
            canvas.height = img.height;

            // Draw image to canvas
            context.drawImage(img, 0, 0);

            // Get image data
            const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
            const pixels = imageData.data;

            // Get dominant colors using k-means clustering
            const colors = getDominantColors(pixels, 2);

            // Convert RGB objects to CSS color strings
            const colorStrings = colors.map(color =>
                `rgb(${Math.round(color.r)}, ${Math.round(color.g)}, ${Math.round(color.b)})`
            );

            resolve([colorStrings[0], colorStrings[1]]);
        };

        img.onerror = () => {
            reject(new Error('Failed to load image'));
        };

        img.src = imageUrl;
    });
}

function getDominantColors(pixels: Uint8ClampedArray, k: number): RGB[] {
    // Convert pixels to RGB array
    const points: RGB[] = [];
    for (let i = 0; i < pixels.length; i += 4) {
        points.push({
            r: pixels[i],
            g: pixels[i + 1],
            b: pixels[i + 2]
        });
    }

    // Initialize centroids randomly
    let centroids: RGB[] = Array(k).fill(null).map(() => {
        const randomIndex = Math.floor(Math.random() * points.length);
        return { ...points[randomIndex] };
    });

    // Run k-means clustering
    const maxIterations = 20;
    for (let iteration = 0; iteration < maxIterations; iteration++) {
        // Assign points to clusters
        const clusters: ColorCluster[] = centroids.map(centroid => ({
            color: centroid,
            count: 0
        }));

        points.forEach(point => {
            const closestClusterIndex = findClosestCluster(point, centroids);
            const cluster = clusters[closestClusterIndex];
            cluster.color.r += point.r;
            cluster.color.g += point.g;
            cluster.color.b += point.b;
            cluster.count++;
        });

        // Calculate new centroids
        const newCentroids = clusters.map(cluster => ({
            r: cluster.color.r / cluster.count,
            g: cluster.color.g / cluster.count,
            b: cluster.color.b / cluster.count
        }));

        // Check for convergence
        if (centroidsEqual(centroids, newCentroids)) {
            break;
        }

        centroids = newCentroids;
    }

    // Sort centroids by brightness
    return centroids.sort((a, b) =>
        (a.r * 0.299 + a.g * 0.587 + a.b * 0.114) -
        (b.r * 0.299 + b.g * 0.587 + b.b * 0.114)
    );
}

function findClosestCluster(point: RGB, centroids: RGB[]): number {
    let minDistance = Infinity;
    let closestIndex = 0;

    centroids.forEach((centroid, index) => {
        const distance = getColorDistance(point, centroid);
        if (distance < minDistance) {
            minDistance = distance;
            closestIndex = index;
        }
    });

    return closestIndex;
}

function getColorDistance(color1: RGB, color2: RGB): number {
    const rDiff = color1.r - color2.r;
    const gDiff = color1.g - color2.g;
    const bDiff = color1.b - color2.b;
    return rDiff * rDiff + gDiff * gDiff + bDiff * bDiff;
}

function centroidsEqual(centroids1: RGB[], centroids2: RGB[]): boolean {
    const threshold = 1;
    return centroids1.every((centroid1, i) => {
        const centroid2 = centroids2[i];
        return getColorDistance(centroid1, centroid2) < threshold;
    });
}

export function createGradientBackground(color1: string, color2: string): string {
    return `linear-gradient(180deg, ${color1} 0%, ${color2} 100%)`;
}
